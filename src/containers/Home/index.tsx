import { useEffect, useState } from "react";
import { HOME } from "../../types/IPage";
import { ITimerLeftActive, UserRequestSchema } from "../../schemaValidations/model.schema";
import { useTimeLeft } from "../../utils/hooks/TimeLeft";
import { Title } from "../../components/Title";
import { Button } from "../../components/Button";
import { useForm } from "react-hook-form";
import { GiInfo } from "react-icons/gi";
import userService from "../../services/user";
import { yupResolver } from "@hookform/resolvers/yup";
import timerService from "../../services/timer";



const Home = () => {

    const [message, setMessage] = useState<string>('');
    const [statusBid, setStatusBid] = useState<string>('');

    /**
     * useForm is a custom hook for managing form
     */
    const { register, handleSubmit, formState: { errors }, reset } = useForm<HOME.IFormInput>({
        resolver: yupResolver(UserRequestSchema),
        mode: 'onChange',
        reValidateMode: 'onChange',
    });

    const onSubmit = async (data: HOME.IFormInput) => {
        const res = await userService.userRequest(data);
        console.log(res.response);

        if (res.status === 201) {
            setStatusBid('success');
            setMessage(res?.data?.data?.message);
            reset();
        } else if (res.status === 400) {
            setStatusBid('error');
            setMessage(res?.data?.message);
        } else {
            setStatusBid('');
        }
    }
    //----------------------End----------------------//


    /**
     * Calculate time left on client side
     */
    const [timer, setTimer] = useState<ITimerLeftActive>({
        _id: '',
        startTime: '',
        endTime: '',
        typeMge: '',
        pointsLimit: 0,
        status: ''
    });
    useEffect(() => {
        timerService.getTimerActive('-users')
            .then((res) => {
                setTimer(res.data.data);
            }).catch((err) => {
                console.log(err);
            });
    }, []);
    const timeLeft = useTimeLeft(timer?.endTime ?? '');
    //----------------------End----------------------//

    return (
        <div className="home-page">
            <Title className="title">ENTER POINTS TO BID</Title>

            {
                timeLeft ?
                    <div className="count-time">
                        <h1 className='time'>
                            <div className="day">
                                <span className="number">{timeLeft?.days}</span><span className="text">DAY</span>
                            </div>
                            <div className="hr">
                                <span className="number">{timeLeft?.hours}</span><span className="text">HR</span>
                            </div>
                            <div className="min">
                                <span className="number">{timeLeft?.minutes}</span><span className="text">MIN</span>
                            </div>
                            <div className="sec">
                                <span className="number">{timeLeft?.seconds}</span><span className="text">SEC</span>
                            </div>
                        </h1>
                    </div>
                    : null
            }

            {
                statusBid === 'error' ?
                    <div className="notify">
                        <div className="alert alert-danger notify-error" role="alert">
                            MGE Bidding Failed. <strong> {message}</strong>
                        </div>
                    </div>
                    : statusBid === 'success' ?
                        <div className="notify">
                            <div className="alert alert-success notify-success" role="alert">
                                {message}
                            </div>
                        </div>
                        : null
            }


            <form>
                <div className="form-group">
                    <div className={`${errors.id ? 'input-error' : 'input'}`}>
                        <label htmlFor="id">ID: </label>
                        <input type="text" {...register('id', { required: true })} placeholder="14521928" />
                    </div>
                    {errors.id && <span className={`${errors.id ? 'text-error' : ''}`}>{errors.id.message}</span>}
                </div>

                <div className="form-group">
                    <div className={`${errors.ingame ? 'input-error' : 'input'}`}>
                        <label htmlFor="ingame">Ingame: </label>
                        <input type="text" {...register('ingame', { required: true })} placeholder="乛 War win" />
                    </div>
                    {errors.ingame && <span className={`${errors.ingame ? 'text-error' : ''}`}>{errors.ingame.message}</span>}
                </div>

                <div className="form-group">
                    <div className={`${errors.pointsRequest ? 'input-error' : 'input'}`}>
                        <label htmlFor="pointRequest">Point Request: </label>
                        <input type="text" {...register('pointsRequest', { required: true })} placeholder="10000000" />
                    </div>
                    {errors.pointsRequest && <span className={`${errors.pointsRequest ? 'text-error' : ''}`}>{errors.pointsRequest.message}</span>}
                </div>

                <div className="form-group">
                    <div className={`${errors.secretKey ? 'input-error' : 'input'}`}>
                        <label htmlFor="secretKey">Secret Key <i className="contact">(Contact: GOL Phuoc): </i></label>
                        <input type="text" {...register('secretKey', { required: true })} placeholder="213d169b7i2o1pc7as3" />
                    </div>
                    {errors.secretKey && <span className={`${errors.secretKey ? 'text-error' : ''}`}>{errors.secretKey.message}</span>}
                </div>

                <div className="form-group">
                    <div className={`${errors.email ? 'input-error' : 'input'}`}>
                        <label htmlFor="email" className="d-flex align-items-center">
                            Email (Optional)
                            <span className="custom-tooltip" style={{ marginLeft: '5px' }}>
                                <GiInfo />
                                <div className="tooltip-box">
                                    When you enter your email, the system will notify you via email when the auction ends.
                                </div>
                            </span>
                        </label>
                        <input type="text" {...register('email', { required: true })} placeholder="abcxyz123@gmail.com" />
                    </div>
                    {errors.email && <span className={`${errors.email ? 'text-error' : ''}`}>{errors.email.message}</span>}
                </div>

                <div className="submit">
                    <Button timeDelay={900} onClick={handleSubmit(onSubmit)} type="submit">Submit</Button>
                </div>
            </form>
        </div>
    )
}

export default Home
