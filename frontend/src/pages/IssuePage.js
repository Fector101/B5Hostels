import {
    //  useContext,
    useState
} from "react";
import { toast } from 'react-toastify';
// import { UserContext } from '../components/js/UserContext';
import GoToTop from '../components/js/GoToTop';
import '../components/css/issuepage.css'

export default function ComplainPage() {
    // const { userData } = useContext(UserContext);
    const [title, setTitle] = useState('');
    const [message, setMessage] = useState('');
    const [submitting, setSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const formData = {
                title,
                message,
                // matric_no: userData?.matric_no,
            };

            const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/complain`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                toast(data.msg || 'Message submitted successfully!', { type: 'success' });
                setTitle('');
                setMessage('');
            } else {
                console.error('Message error:', data);
                toast(data.msg || 'Something went wrong. Try again.', { type: 'warning' });
            }

        } catch (error) {
            console.error('Message failed:', error);
            toast('An error occurred - ' + error.message, { type: 'error' });
        }
        setSubmitting(false);
    };

    return (
        <div className="page complain-page flex">
            {submitting &&
                <div className='modal signing-in-spinner-case'>
                    <div id="spinner" className="spinner"></div>
                </div>
            }

            <form className="page flex fd-column" onSubmit={handleSubmit}>
                <label>Issue Title</label>
                <input
                    placeholder="Enter Issue Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <label>Issue Body</label>
                <textarea
                    placeholder="Describe your issue here..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                />

                <button type="submit" className="primary-btn">Submit</button>
            </form>

            <GoToTop />
        </div>
    );
}
