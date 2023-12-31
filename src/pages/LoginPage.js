import { Button, Container } from 'react-bootstrap';
import InputTextLabel from '../components/common/InputLabel';
import Form from 'react-bootstrap/Form';
import './LoginPage.css';
import { useEffect, useState } from 'react';
import { loginUser } from '../services/userService';
import { setUser } from '../redux/reducers/userSlice';
import { useDispatch } from 'react-redux';
import LoadingScreen from '../components/common/LoadingScreen';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const inputChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        const user = await loginUser(formData);
        setLoading(false);
        dispatch(setUser(user));
        navigate(`/${user.user_id}/home`);
        localStorage.setItem('user', JSON.stringify(user));
    };

    useEffect(() => {
        const user = localStorage.getItem('user');
        if(user) {
        const userObject = JSON.parse(user);
        navigate(`/${userObject.user_id}/home`, { replace: true });
      }
    }, []);

    return (
        <div className="signup-page">
        <div className="background-image-container">
            <img className="signup-image" src={require("../assets/signup-bg-image.jpg")}></img>
        </div>
        <div className="signup-form-container">
        <Container>
            {loading && <LoadingScreen />}
            <Form onSubmit={handleSubmit}>
                <InputTextLabel label="Email Address" type="email" name="email" onChange={inputChangeHandler}></InputTextLabel>
                <InputTextLabel label="Password" type="password" name="password" onChange={inputChangeHandler}></InputTextLabel>
                <Container className="align-items-center d-flex flex-column">
                    <Button className="login-button" variant="dark" type="submit">Submit</Button>
                </Container>
            </Form>
        </Container>
        </div>
        </div>
    );
};

export default LoginPage;
