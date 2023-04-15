import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react'

const SignOut = () => {

    return (
        <div className="signout">
            <AmplifySignOut buttonText='Exit' />
        </div>
    )

}
export default withAuthenticator(SignOut);