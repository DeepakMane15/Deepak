const Navbar = ({ title }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='container'>
                <a className="navbar-brand" href="#">{title}</a>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                {title != 'Sign-Up' && (
                    <div className="collapse navbar-collapse" id="navbarNav" style={{justifyContent:"end"}}>
                                <a className="nav-link" href="/signup">Nurse Signup</a>
                    </div>
                )}
            </div>
        </nav>
    )
}
export default Navbar;