import Form from 'react-bootstrap/Form';

const InputTextLabel = ({ label, onChange, type, name, formId, value }) => {
    return (
        <>
            <Form.Group formid={formId}>
                <Form.Label>{label}</Form.Label>
                <Form.Control type={type} onChange={onChange} name={name} value={value} className="w-100 w-md-auto" />
            </Form.Group>
        </>
    )
}

export default InputTextLabel;
