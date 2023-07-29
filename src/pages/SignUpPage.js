import { Button, Container } from 'react-bootstrap';
import InputTextLabel from '../components/common/InputLabel';
import Form from 'react-bootstrap/Form';
import './SignUpPage.css';
import { useState } from 'react';
import { signUpUser } from '../services/userService';
import { setUser } from '../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
import LoadingScreen from '../components/common/LoadingScreen';
import { useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        email: '',
        password: '',
    });
    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const user = await signUpUser(formData);
        setLoading(false);
        dispatch(setUser(user));
        localStorage.setItem('token', user.token);
        navigate(`/${user.user_id}/home`)
    };

    return (
        <div className="signup-page">
        <div className="background-image-container">
            <img className="signup-image" src={require("../assets/signup-bg-image.jpg")}></img>
        </div>
        <div className="signup-form-container">
            <Container >
            {loading && <LoadingScreen />}
            <Form onSubmit={handleSubmit}>
                <InputTextLabel label="First Name" type="text" name="first_name" onChange={inputChangeHandler}></InputTextLabel>
                <InputTextLabel label="Last Name" type="text" name="last_name" onChange={inputChangeHandler}></InputTextLabel>
                <InputTextLabel label="Email Address" type="email" name="email" onChange={inputChangeHandler}></InputTextLabel>
                <InputTextLabel label="Password" type="password" name="password" onChange={inputChangeHandler}></InputTextLabel>
                <Container className="align-items-center d-flex flex-column">
                    <Button className="signup-button" variant="dark" type="submit">Submit</Button>
                </Container>

            </Form>

        </Container>
        </div>
        </div>
    )
}

export default SignUpPage;