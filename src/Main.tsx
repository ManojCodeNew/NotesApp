import Login from "./Components/Login"
import Note from "./Components/Note"
import { useAppSelector } from "./redux/hook"
function Main() {
    const userLoginStatus = useAppSelector(state => state.auth)
    return (
        <div>
            {userLoginStatus.isLoggedIn ? <Note /> : <Login />}
        </div>
    )
}

export default Main
