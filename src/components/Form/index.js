import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Input from "components/Input";
import { useCallback } from "react";

const DynamicForm = ({ formConfig, onSubmit, onCancel, initialValues, validationSchema }) => {

    const generateDefaultSchema = useCallback(() => {
        return yup.object().shape(
            formConfig.reduce((accumulator, { name, label }) => {
                accumulator[name] = yup.string().required(`${label} is required`);
                return accumulator;
            }, {})
        );
    }, [formConfig]);

    const schema = validationSchema || generateDefaultSchema();

    const { control, handleSubmit: handleFormSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues || {},
    });

    const handleSubmit = (data) => {
        onSubmit(data);
    };


    const handleCancel = () => {
        onCancel?.()
    }

    return (
        <form className="w-full flex flex-col" onSubmit={handleFormSubmit(handleSubmit)}>
            <div className="flex flex-wrap -mx-3">
                {formConfig.map(({ type, name, label, flex, ...rest }) => (
                    <div key={name} className={`mb-8 px-3 ${flex ? 'w-1/2' : 'w-full'}`}>
                        <Controller
                            control={control}
                            name={name}
                            render={({ field }) => (
                                <Input
                                    type={type ?? "text"}
                                    label={label}
                                    placeholder={`Enter ${label}`}
                                    className={`${errors[name] ? 'border-red-500' : ''}`}
                                    {...field}
                                    {...rest}
                                />
                            )}
                        />
                        {errors[name] && (
                            <span className="text-red-500">{errors[name].message}</span>
                        )}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 gap-6 text-center">
                <button type="button" className="btn--outline" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="btn--secondary">confirm</button>
            </div>
        </form>
    );
};

export default DynamicForm;
