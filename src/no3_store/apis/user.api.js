import axios from "axios";



export const userAllGetApi = async () => {
    try {
        const response = await axios.get("http://localhost:3001/user")
        return response.data
    } catch (error) {
        throw error
    }
}
export const userLoginApi = async (userObj) => {
    try {
        const response = await axios.get(`http://localhost:3001/user?username=${userObj.username}`)
        const users = response.data
        if (users.length === 0) {
            throw new Error("존재하지 않는 사용자입니다.")
        }
        const user = users[0]
        if (user.password !== userObj.password) {
            throw new Error("비밀번호가 일치하지 않습니다.")
        }
        console.log(users[0])
        return users[0]
    } catch (error) {
        throw error
    }
}

export const userRegisterApi = async (userObj) => {
    try {
        const response = await axios.get(`http://localhost:3001/user?username=${userObj.username}`)
        const users = response.data
        if (users.length > 0) {
            return Error("이미 존재하는 계정입니다.")
        }
        return await axios.post(`http://localhost:3001/user`, userObj)
    } catch (error) {
        throw error
    }
}