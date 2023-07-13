import { Button, Container } from 'react-bootstrap';
import InputTextLabel from '../components/common/InputLabel';
import Form from 'react-bootstrap/Form';
import './LoginPage.css';
import { useState } from 'react';
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
        console.log(user);
        dispatch(setUser(user));
        navigate(`/${user.user_id}/home`);
    };

    return (
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
    );
};

export default LoginPage;