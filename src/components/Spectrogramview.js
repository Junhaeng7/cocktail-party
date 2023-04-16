import React, { useEffect, useRef, useState } from "react";

import WaveSurfer from "wavesurfer.js";
import SpectrogramPlugin from "wavesurfer.js/src/plugin/spectrogram";
import RegionsPlugin from "wavesurfer.js/src/plugin/regions";
// import CursorPlugin from "wavesurfer.js/src/plugin/cursor";
// import TimelinePlugin from "wavesurfer.js/src/plugin/timeline";
import createColormap from "colormap";
import "./Spectrogramview.css";
import PropTypes from "prop-types";
import { useLocation } from "react-router-dom";
import Button from "./Button";

/* Mui imports for designing */
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Slider from "@mui/material/Slider";
import Radio from "@mui/material/Radio";
import { Button as MuiButton } from "@mui/material";
import ButtonGroup from "@mui/material/ButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import LinearProgress from "@mui/material/LinearProgress";

/**Icons from  Mui */
import VolumeDown from "@mui/icons-material/VolumeDown";
import VolumeUp from "@mui/icons-material/VolumeUp";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import { Container, Grid, IconButton } from "@material-ui/core";

import Storage from "@aws-amplify/storage";

import { Auth } from "aws-amplify";
import DynamoAccess from "functions/dynamoaccess";

//TO DO: Take file and load regions into Wave

//TO DO: Add Exporting Functionality
const dyn = new DynamoAccess();

const theme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

const colors = createColormap({
  colormap: "jet",
  nshades: 256,
  format: "float",
});
console.log(colors);
const formWaveSurferOptions = (ref, minPx) => ({
  container: ref,
  waveColor: "#FFFFFF",
  progressColor: "blue",
  cursorColor: "gray",
  barWidth: 1,
  cursorWidth: 5,
  responsive: true,
  height: 240,
  scrollParent: true,
  fillParent: false,
  minPxPerSec: minPx,
  // If true, normalize by the maximum peak instead of 1.0.
  normalize: false,
  // Use the PeakCache to improve rendering speed of large waveforms.
  partialRender: false,
  fftSamples: 512,
  colorMap: colors,
  plugins: [
    RegionsPlugin.create({
      regionsMinLength: 0.01,
      dragSelection: {
        slop: 5,
      },
      color: "rgba(152,255,152,0.2)",
    }),
    // TimelinePlugin.create({
    //   container: "#wave-timeline",
    // }),
    SpectrogramPlugin.create({
      container: ref,
      labels: false,
      deferInit: false,
      colorMap: colors,
    }),
  ],
});

//Function that handles the rendering of spectrogram when component ismounted
const Spectrogramview = ({ link, filename, zoom }) => {
  var username;

  // TODO: Looking at ways to use different authentication levels for Admins, Reviewers, Labelers, etc.
  // Auth.currentAuthenticatedUser()
  //   .then((data) => {
  //     let idToken = data;
  //     username = idToken.username;
  //   })
  //   .catch((err) => console.log(err)); // Need to add alert if username doesnt exist for this user.

  // const url = 'http://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3'

  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [ready, setReady] = useState(false);
  const [playing, setPlay] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [currZoom, setZoom] = useState(zoom);
  const [allRegions, setRegions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);

  let location = useLocation();

  if (location.state !== undefined) {
    link = location.state.link;
    filename = location.state.file;
  }

  const changeReady = () => {
    setReady(!ready);
  };

  const zoomChange = (event, newZoom) => {
    zoom = event.target.value;
    setZoom(newZoom);
  };

  const controlZoom = (item) => ({
    checked: currZoom === item,
    onChange: zoomChange,
    value: item,
    name: "zoom-radio-button",
    inputProps: { "aria-label": item },
  });

  const handlePlaybackRateChange = (event) => {
    setPlaybackRate(parseFloat(event.target.value));
    wavesurfer.current.setPlaybackRate(event.target.value);
  };

  // function testDynamo() {
  //   let dyn = new DynamoAccess();
  //   console.log("Dynamo connecting...");
  //   dyn.connect().then((res) => dyn.listTables());
  //   // dyn.listTables();
  // }
  // function testDynamoInsert() {
  //   /* TO DO */
  // }

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/public/wavesurfer.js";
    script.async = true;
    document.body.appendChild(script);

    setPlay(false);

    const options = formWaveSurferOptions(waveformRef.current, currZoom);
    wavesurfer.current = WaveSurfer.create(options);

    //Will load open source poetry as default...
    wavesurfer.current.load("/Chickens-clucking.mp3");

    wavesurfer.current.on("ready", function () {
      if (wavesurfer.current) {
        wavesurfer.current.setVolume(volume);
        setVolume(volume);
      }
      if (allRegions) {
        loadRegions(allRegions);
      }
    });

    wavesurfer.current.on("region-click", function (region, e) {
      console.log(region.start);
      console.log(region.end);
      e.stopPropagation();
      // wavesurfer.current.
      wavesurfer.current.play(region.start, region.end);
      setPlay(!playing);
    });

    hideShowNote();

    wavesurfer.current.on("region-click", editAnnotation);
    wavesurfer.current.on("region-update-end", saveRegions);
    wavesurfer.current.on("region-updated", saveRegions);
    wavesurfer.current.on("region-removed", saveRegions);
    wavesurfer.current.on("region-in", showNote);
    wavesurfer.current.on("region-out", hideNote);
    // Removes events, elements and disconnects Web Audio nodes.
    // when component unmount
    return () => wavesurfer.current.destroy();
  }, [link, currZoom]);

  const handlePlayPause = () => {
    setPlay(!playing);
    wavesurfer.current.playPause();
  };

  const handlePlay = () => {
    wavesurfer.current.play();
  };

  const handlePause = () => {
    wavesurfer.current.pause();
  };

  const onVolumeChange = (e) => {
    const { target } = e;
    const newVolume = +target.value;

    if (newVolume) {
      setVolume(newVolume);
      wavesurfer.current.setVolume(newVolume || 1);
    }
  };

  const onZoomChange = (e) => {
    const { target } = e;
    const newZoom = +target.value;

    if (newZoom) {
      wavesurfer.current.zoom(target.value);
    }
  };

  function saveRegions() {
    //  hideShowNote();
    localStorage.regions = JSON.stringify(
      Object.keys(wavesurfer.current.regions.list).map(function (id) {
        let region = wavesurfer.current.regions.list[id];
        return {
          start: region.start,
          end: region.end,
          attributes: region.attributes,
          data: region.data,
        };
      })
    );
  }

  function exportLabels() {
    var tag = username.substr(0, 4);

    var labels_to_string = "";

    JSON.stringify(
      Object.keys(wavesurfer.current.regions.list).map(function (id) {
        let region = wavesurfer.current.regions.list[id];
        labels_to_string =
          labels_to_string +
          region.start +
          "\t" +
          region.end +
          "\t" +
          region.data.note +
          "\n";
        return {};
      })
    );
    console.log(labels_to_string);
    Storage.put(
      ("exported_app_files" + "/" + filename).replace(
        ".flac",
        "_" + tag + ".txt"
      ),
      //   JSON.stringify(
      //     Object.keys(wavesurfer.current.regions.list).map(function(id) {
      //         let region = wavesurfer.current.regions.list[id];

      //         return {
      //             start: region.start,
      //             end: region.end,
      //             attributes: region.attributes,
      //             data: region.data
      //         };
      // }))
      labels_to_string
    )
      .then((result) => console.log(result))
      .catch((err) => console.log(err));
  }

  /**
   * Load regions from storage.
   */
  function loadRegions(regions) {
    regions.forEach(function (region) {
      // region.color = randomColor(0.25);
      wavesurfer.current.addRegion(region);
    });
  }

  function hideShowNote() {
    let label = document.getElementById("label-form");
    if (label.style.display === "none") {
      label.style.display = "block";
    } else {
      label.style.display = "none";
    }
  }

  function editAnnotation(region) {
    hideShowNote();

    let form = document.forms.edit;
    form.style.opacity = 1;
    form.elements.start.value = (region.start * 100) / 100;
    form.elements.end.value = (region.end * 100) / 100;
    form.elements.note.value = region.data.note || "";
    form.onsubmit = function (e) {
      hideShowNote();
      e.preventDefault();
      region.update({
        start: form.elements.start.value,
        end: form.elements.end.value,
        data: {
          note: form.elements.note.value,
        },
      });
      if (!allRegions) {
        setRegions([region]);
      } else {
        var arr = allRegions;
        arr[allRegions.length] = region;
        setRegions(arr);
      }
      console.log(allRegions);
      form.style.opacity = 0;
    };
    form.onreset = function () {
      form.style.opacity = 0;
      form.dataset.region = null;
    };
    form.dataset.region = region.id;
  }

  function showNote(region) {
    if (!showNote.el) {
      showNote.el = document.querySelector("#subtitle");
    }
    showNote.el.style.color = "Red";
    showNote.el.style.fontSize = "large";
    showNote.el.textContent = region.data.note || "–";
  }

  function hideNote(region) {
    if (!hideNote.el) {
      hideNote.el = document.querySelector("#subtitle");
    }
    hideNote.el.style.color = "Red";
    hideNote.el.style.fontSize = "large";
    hideNote.el.textContent = "–";
  }

  return (
    <div className="spectrogram">
      <div className="fileName">
        <p>Current File: {filename}</p>
      </div>
      <div>Click and drag on the spectrogram to select a region to edit. Then click a resolution below to open the label menu.</div>
      <div className="upperControls">
        <ThemeProvider theme={theme}>
          <Grid
            container
            direction="row"
            spacing={8}
            justifyContent="center"
            // spacing={2}
          >
            <Grid item>
              <ButtonGroup
                variant="contained"
                aria-label="outlined primary button group"
              >
                <MuiButton
                  aria-label="play"
                  size="large"
                  color="primary"
                  onClick={handlePlay}
                >
                  <PlayArrowIcon />
                </MuiButton>
                <MuiButton
                  aria-label="pause"
                  size="large"
                  color="secondary"
                  onClick={handlePause}
                >
                  <PauseIcon />
                </MuiButton>
              </ButtonGroup>
            </Grid>

            <Grid item>
              <MuiButton
                color="secondary"
                variant="contained"
                size="large"
                onClick={exportLabels}
                className="ExportBtn"
              >
                Export
              </MuiButton>
            </Grid>
          </Grid>
        </ThemeProvider>
      </div>
      <div id="waveform" ref={waveformRef} className="audio_visual" />
      <div className="col-sm-3"></div>
      <div className="lowerControls">
        <Grid container spacing={8} justifyContent="center">
          <Grid item>
            <ToggleButtonGroup
              aria-label="outlined primary button group"
              color="secondary"
              value={currZoom}
              exclusive
              onChange={zoomChange}
            >
              <ToggleButton value={"100"}>100px</ToggleButton>
              <ToggleButton value={"250"}>250px</ToggleButton>
              <ToggleButton value={"500"}>500px</ToggleButton>
            </ToggleButtonGroup>
            {/* </ Box> */}
          </Grid>
          {/* <Grid container spacing = {12}> */}
          <Grid item>
            <Box>
              <VolumeDown />
              <Slider
                aria-label="Volume"
                min={0.01}
                max={1}
                step={0.025}
                defaultValue={volume}
                onChange={onVolumeChange}
                sx={{ width: 100 }}
              />
              <VolumeUp />
            </Box>
          </Grid>
          <Grid item>
            <Box>
              <label>Playback Rate: x{playbackRate} </label>
              <input
                type="range"
                min="0.5"
                max="2"
                step="0.5"
                value={playbackRate}
                onChange={handlePlaybackRateChange}
              />
            </Box>
          </Grid>
        </Grid>
      </div>
      {/* The Below Form is using standard HTML w/ Javascript references. Not the Cleanest. Potential for improvement is to get into react style. */}
      <p id="subtitle" className="text-center text-info">
        &nbsp;
      </p>
      <form id="label-form" name="edit">
        <div class="col-sm-3 form-group region-times">
          {/* <label for="start">Begin</label>
                    <input className="form-control" id="start" name="start" /> */}
          <TextField
            id="start"
            label="Region Start"
            defaultValue=""
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
            }}
          />
          {/* <label for="end">End</label> */}
          {/* <input className="form-control" id="end" name="end" /> */}
          <TextField
            id="end"
            label="Region End"
            defaultValue=""
            variant="outlined"
            size="small"
            InputProps={{
              readOnly: true,
            }}
          />
        </div>

        <div className="col-sm-6 form-group">
          <TextField
            required
            id="note"
            name="note"
            className="form-control"
            label="Label"
            defaultValue=""
            helperText="Please add your annotation above"
            variant="filled"
          />
          {/* <textarea id="note" className="form-control" rows="3" name="note"></textarea> */}
        </div>

        <div className="col-sm-3" id="save-delete">
          <center>
            <b>Region edit</b>
          </center>
          <MuiButton
            type="submit"
            onClick={() => {
              saveRegions();
            }}
            className="btn btn-success btn-block"
            variant="contained"
            color="success"
          >
            Save
          </MuiButton>
          <center>
            <b>or</b>
          </center>
          <MuiButton
            onClick={() => {
              let form = document.forms.edit;
              let regionId = form.dataset.region;
              if (regionId) {
                wavesurfer.current.regions.list[regionId].remove();
                form.reset();
              }
            }}
            className="btn btn-danger btn-block"
            variant="contained"
            color="error"
          >
            Delete
          </MuiButton>
        </div>
      </form>
      <div>
        {/* <MuiButton
          onClick={() => {
            testDynamo();
          }}
        >
          Test
        </MuiButton> */}
        <MuiButton onCLick={() => {}}>Test DB Exporting</MuiButton>
      </div>
    </div>
  );
};
Spectrogramview.defaultProps = {
  // location: {state: 'https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3' }
  // link: "https://ia902606.us.archive.org/35/items/shortpoetry_047_librivox/song_cjrg_teasdale_64kb.mp3",

  filename: "TestFile.mp3",

  zoom: 100,
};

export default Spectrogramview;
