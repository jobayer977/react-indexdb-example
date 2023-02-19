class _Paths {
	//? AUTH
	public Auth = "/auth/"
	public forgotPassword = `${this.Auth}forget-password/`

	//? USERS
	public Users = "/users/"
	public UsersMe = `${this.Users}me`
	public UsersList = `${this.Users}`
	public UsersResellerRequest = `${this.Users}reseller-request`
}

export const Paths = new _Paths()
