import React from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import '../../styles/admin/MgeAdminForm.scss';
import timerService from '../../services/timer';
import toast from 'react-hot-toast';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface MgeFormData {
    startTime: string;
    endTime: string;
    typeMge: 'Mixtroop' | 'Infantry' | 'Cavalry' | 'Archer';
    pointsLimit: number;
    secretKey: string;
}

const MgeAdminForm: React.FC = () => {
    const initialData = {
        startTime: "",
        endTime: "",
        typeMge: "Mixtroop" as const,
        pointsLimit: 10000000,
        secretKey: ""
    };

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        watch,
        getValues,
        setValue,
    } = useForm<MgeFormData>({
        mode: 'onChange',
        defaultValues: {
            startTime: '',
            endTime: '',
            typeMge: initialData.typeMge,
            pointsLimit: initialData.pointsLimit,
            secretKey: initialData.secretKey
        }
    });

    const watchedStartTime = watch('startTime');

    const onSubmit: SubmitHandler<MgeFormData> = async (data) => {
        await new Promise(resolve => setTimeout(resolve, 1000));

        const payload = {
            ...data,
            startTime: new Date(data.startTime).toISOString(),
            endTime: new Date(data.endTime).toISOString(),
        };

        timerService.setTimer(payload)
            .then((res) => {
                if (res.status === 201) {
                    toast.success("Cấu hình thành công!");
                }
            })
            .catch((error) => {
                console.error("Error setting timer:", error);
                toast.error(error?.response?.data?.message || "Có lỗi xảy ra trong quá trình cấu hình!");
            });
    };

    return (
        <div className="admin-form-container">
            <h2 className="form-title">Cấu hình Sự kiện MGE</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="mge-admin-form" noValidate>

                {/* Start Time */}
                <div className="form-group">
                    <label>Thời gian bắt đầu:</label>
                    <Controller
                        control={control}
                        name="startTime"
                        rules={{ required: 'Thời gian bắt đầu là bắt buộc.' }}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value ? new Date(field.value) : null}
                                onChange={(date) => field.onChange(date?.toISOString())}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="yyyy-MM-dd HH:mm"
                                minDate={new Date()}
                                className={`datepicker-input ${errors.startTime ? 'input-error' : ''}`}
                                placeholderText="Chọn thời gian bắt đầu"
                            />
                        )}
                    />
                    {errors.startTime && <p className="error-message">{errors.startTime.message}</p>}
                </div>

                {/* End Time */}
                <div className="form-group">
                    <label>Thời gian kết thúc:</label>
                    <Controller
                        control={control}
                        name="endTime"
                        rules={{
                            required: 'Thời gian kết thúc là bắt buộc.',
                            validate: (value) => {
                                const start = new Date(getValues('startTime'));
                                const end = new Date(value);
                                return end > start || 'Thời gian kết thúc phải sau thời gian bắt đầu.';
                            }
                        }}
                        render={({ field }) => (
                            <DatePicker
                                selected={field.value ? new Date(field.value) : null}
                                onChange={(date) => field.onChange(date?.toISOString())}
                                showTimeSelect
                                timeFormat="HH:mm"
                                timeIntervals={15}
                                dateFormat="yyyy-MM-dd HH:mm"
                                minDate={watchedStartTime ? new Date(watchedStartTime) : new Date()}
                                className={`datepicker-input ${errors.endTime ? 'input-error' : ''}`}
                                placeholderText="Chọn thời gian kết thúc"
                            />
                        )}
                    />
                    {errors.endTime && <p className="error-message">{errors.endTime.message}</p>}
                </div>

                {/* Type MGE */}
                <div className="form-group">
                    <label>Loại MGE:</label>
                    <select
                        className={errors.typeMge ? 'input-error' : ''}
                        {...register('typeMge', { required: 'Vui lòng chọn loại MGE.' })}
                    >
                        <option value="Mixtroop">Mixtroop</option>
                        <option value="Infantry">Infantry</option>
                        <option value="Cavalry">Cavalry</option>
                        <option value="Archer">Archer</option>
                    </select>
                    {errors.typeMge && <p className="error-message">{errors.typeMge.message}</p>}
                </div>

                {/* Points Limit */}
                <div className="form-group">
                    <label>Giới hạn điểm:</label>
                    <input
                        type="number"
                        className={`points-input ${errors.pointsLimit ? 'input-error' : ''}`}
                        {...register('pointsLimit', {
                            required: 'Giới hạn điểm là bắt buộc.',
                            valueAsNumber: true,
                            min: { value: 0, message: 'Giới hạn điểm không được âm.' }
                        })}
                    />
                    {errors.pointsLimit && <p className="error-message">{errors.pointsLimit.message}</p>}
                </div>

                {/* Secret Key */}
                <div className="form-group">
                    <label>Secret Key:</label>
                    <input
                        type="text"
                        className={`secret-key-input ${errors.secretKey ? 'input-error' : ''}`}
                        {...register('secretKey', { required: 'Secret Key là bắt buộc.' })}
                    />
                    {errors.secretKey && <p className="error-message">{errors.secretKey.message}</p>}
                </div>

                {/* Submit Button */}
                <button type="submit" className="submit-button" disabled={isSubmitting}>
                    {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                </button>
            </form>
        </div>
    );
};

export default MgeAdminForm;
