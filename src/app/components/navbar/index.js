const Navbar = ({ title }) => {

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className='container'>
                <a className="navbar-brand" href="#">{title}</a>

                {title != 'Sign-Up' && (<>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav" style={{ marginLeft: '20px' }}>
                        <a className="nav-link" href="/signup">Add New Profile</a>
                        <a style={{ marginLeft: '20px' }} className="nav-link" href="/">View Profile</a>
                        <a style={{ position: 'absolute', right: '80px' }}> Logout</a>
                    </div>
                </>
                )}
            </div>
        </nav>
    )
}
export default Navbar;