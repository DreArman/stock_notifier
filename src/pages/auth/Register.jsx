const Register = () => {
    return (
        <main className="vh-100 d-flex justify-content-center align-items-center bg-body-tertiary">
            <form >
                <img className="mb-4" src="https://cdn-icons-png.flaticon.com/512/17473/17473639.png" alt="" width="80" height="80"/>
                <h1 className="h3 mb-3 fw-normal">Please Sign Up</h1>

                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Surname Name</label>
                </div>
                <div className="form-floating">
                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com"/>
                    <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating">
                    <input type="password" className="form-control" id="floatingPassword" placeholder="Password"/>
                    <label htmlFor="floatingPassword">Password</label>
                </div>

                <div className="form-check text-start my-3">
                    <input className="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault"/>
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                        Remember me
                    </label>
                </div>
                <button className="btn btn-primary w-100 py-2" type="submit">Sign in</button>
            </form>
        </main>
    );  
}

export default Register;