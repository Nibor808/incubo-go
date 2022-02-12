import React, {Suspense, useRef, useState} from 'react';
import validateForm from '../utils/validate_form';
import axios, {AxiosResponse} from 'axios';
import ReCAPTCHA from 'react-google-recaptcha';
import ErrorBoundary from './ErrorBoundary';

const ContactForm = React.lazy(() => import('./ContactForm'));

enum ResponseDataType {
    DEFAULT = '',
    OK = 'ok',
    ERROR = 'error',
}

type ResponseData = {
    Type: ResponseDataType;
    Message: string;
};

enum MailInfoType {
    DEFAULT = '',
    NAME = 'name',
    EMAIL = 'email',
    MESSAGE = 'message',
    CAPTCHA = 'captcha',
}

type MailInfo = {
    name: MailInfoType;
    email: MailInfoType;
    message: MailInfoType;
};

export type FormError = {
    type: string;
    msg: string;
};

export type Errors = {
    nameError: string;
    nameErrorBorder: string;
    emailError: string;
    emailErrorBorder: string;
    messageError: string;
    messageErrorBorder: string;
    captchaError: string;
};

const Contact = () => {
    const recaptchaRef = useRef<ReCAPTCHA>(null);
    const ERROR_BORDER = '1px solid rgb(211, 0, 57)';
    const contactForm = document.getElementById('contact-form') as HTMLFormElement;

    const [name, setName] = useState<MailInfoType>(MailInfoType.DEFAULT);
    const [email, setEmail] = useState<MailInfoType>(MailInfoType.DEFAULT);
    const [message, setMessage] = useState<MailInfoType>(MailInfoType.DEFAULT);
    const [response, setResponse] = useState<ResponseData>({
        Message: '',
        Type: ResponseDataType.DEFAULT,
    });
    const [errors, setErrors] = useState<Errors>({
        nameError: '',
        nameErrorBorder: '',
        emailError: '',
        emailErrorBorder: '',
        messageError: '',
        messageErrorBorder: '',
        captchaError: '',
    });
    const [isSending, setIsSending] = useState(false);

    const validateValues = (ev: React.FormEvent) => {
        ev.preventDefault();

        const captchaValue = recaptchaRef.current?.getValue();

        const formError: FormError = validateForm(name, email, message, captchaValue);

        if (formError) {
            switch (formError.type) {
                case MailInfoType.NAME:
                    setErrors({
                        ...errors,
                        nameErrorBorder: ERROR_BORDER,
                        nameError: formError.msg,
                    });

                    return false;
                case MailInfoType.EMAIL:
                    setErrors({
                        ...errors,
                        emailErrorBorder: ERROR_BORDER,
                        emailError: formError.msg,
                    });

                    return false;
                case MailInfoType.MESSAGE:
                    setErrors({
                        ...errors,
                        messageErrorBorder: ERROR_BORDER,
                        messageError: formError.msg,
                    });

                    return false;

                case MailInfoType.CAPTCHA:
                    setErrors({
                        ...errors,
                        captchaError: formError.msg,
                    });

                    return false;
                default:
                // Do Nothing
            }
        }

        setResponse({Message: '', Type: ResponseDataType.DEFAULT});
        clearErrors();
        return true;
    };

    const resetForm = (): void => {
        recaptchaRef.current?.reset();
        setIsSending(false);
        setName(MailInfoType.DEFAULT);
        setEmail(MailInfoType.DEFAULT);
        setMessage(MailInfoType.DEFAULT);

        setTimeout(() => {
            contactForm?.reset();
            setResponse({Message: '', Type: ResponseDataType.DEFAULT});
        }, 3000);
    };

    const sendMail = async (ev: React.FormEvent) => {
        ev.preventDefault();

        if (validateValues(ev)) {
            const info: MailInfo = {
                name,
                email,
                message,
            };

            setIsSending(true);

            const response: AxiosResponse = await axios.post('/api/sendmail', info);
            const {data}: {data: ResponseData} = response;

            setResponse(data);
            resetForm();
        }
    };

    const showResponse = React.useCallback(() => {
        let klass;

        if (response) {
            klass = response.Type === ResponseDataType.OK ? 'success' : 'error';

            return <p className={klass}>{response.Message}</p>;
        }

        return null;
    }, [response]);

    const clearErrors = () => {
        return setErrors({
            nameErrorBorder: '',
            nameError: '',
            emailErrorBorder: '',
            emailError: '',
            messageErrorBorder: '',
            messageError: '',
            captchaError: '',
        });
    };

    const handleChange = (
        ev: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        type: string
    ) => {
        if (type === MailInfoType.NAME) setName(ev.target.value as MailInfoType);
        else if (type === MailInfoType.EMAIL) setEmail(ev.target.value as MailInfoType);
        else if (type === MailInfoType.MESSAGE) setMessage(ev.target.value as MailInfoType);

        clearErrors();
    };

    const buttonText = isSending ? 'Sending...' : 'Send';

    return (
        <div data-testid="contact-div">
            <Suspense fallback={<div>Loading...</div>}>
                <ErrorBoundary>
                    <ContactForm
                        sendMail={sendMail}
                        onChange={handleChange}
                        errors={{...errors}}
                        showResponse={showResponse}
                        recaptchaRef={recaptchaRef}
                        buttonText={buttonText}
                        isSending={isSending}
                    />
                </ErrorBoundary>
            </Suspense>
        </div>
    );
};

export default React.memo(Contact);
