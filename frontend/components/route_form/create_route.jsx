import React from 'react';
import { Link } from 'react-router-dom';

class CreateRouteForm extends React.Component {

render () {
    return(
        <div>
            <h1>this will render a map in which we can create a route</h1>
            <Link to={"/dashboard"}>Home</Link>
            <Link to={"/routes"}>Index</Link>
        </div>
    )
}


}

export default CreateRouteForm;