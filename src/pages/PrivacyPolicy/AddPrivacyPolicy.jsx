import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import RichTextEditor, {
    BaseKit,
    Bold,
    BulletList,
    Heading,
    Italic,
    Underline,
} from 'reactjs-tiptap-editor';

// Import CSS
import 'reactjs-tiptap-editor/style.css';

const extensions = [
    BaseKit.configure({
        placeholder: {
            showOnlyCurrent: true,
        },
        characterCount: {
            limit: 50_000,
        },
    }),
    Bold,
    Italic,
    Underline,
    Heading,
    BulletList,
];

const AddPrivacyPolicy = () => {
    const [content, setContent] = useState('');

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm();

    // Register the editor with react-hook-form
    useEffect(() => {
        register('privacyPolicy', {
            required: 'Privacy Policy content is required',
            minLength: {
                value: 50,
                message: 'Privacy Policy must be at least 50 characters long',
            },
        });
    }, [register]);

    const onChangeContent = (value) => {
        setContent(value);
        setValue('privacyPolicy', value); // Update the form value
    };

    const onSubmit = (data) => {
        console.log('Form Data:', data);
        alert('Privacy Policy saved successfully!');
    };

    return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg w-full">
            <h1 className="text-3xl font-bold mb-4 text-gray-800">Privacy Policy Editor</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
                <RichTextEditor
                    output="html"
                    content={content}
                    onChangeContent={onChangeContent}
                    extensions={extensions}
                    dark={false}
                    minHeight="500px"
                />

                {/* Display validation error */}
                {errors.privacyPolicy && (
                    <p className="text-red-500 mt-2">{errors.privacyPolicy.message}</p>
                )}

                <div className="mt-6">
                    <button
                        type="submit"
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Save Privacy Policy
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPrivacyPolicy;
