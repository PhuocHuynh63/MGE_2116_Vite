import { date, z } from "zod";
import * as yup from "yup"

export const BackendResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
    z.object({
        statusCode: z.number().optional(),
        message: z.string().optional(),
        error: z.string().optional(),
        data: dataSchema.optional(),
    }).refine(
        (obj) =>
            (obj.statusCode === 201 && obj.data !== undefined && obj.error === undefined) ||
            (obj.statusCode !== 201 && obj.data === undefined && obj.error !== undefined),
        {
            message: "Invalid response structure",
            path: [],
        }
    );

/**
 * MgeShema is a schema for MGE data
 */
const MgeSchema = z.object({
    results: z.array(z.object({
        id: z.string(),
        name: z.string(),
        typeMge: z.string(),
        img: z.string(),
    }))
})

export const MgeResponseSchema = BackendResponseSchema(MgeSchema);
export type IMGE = z.TypeOf<typeof MgeResponseSchema>;
//----------------------End----------------------//


/**
 * UserSchema is a schema for User request
 * @param id is a string
 * @param ingame is a string
 * @param pointRequest is a number
 * @returns UserSchema
 */
export const UserRequestSchema = yup.object({
    id: yup.string().required('ID is required'),
    ingame: yup.string().required('Ingame is required'),
    pointsRequest: yup
        .number()
        .typeError('Point must be a number')
        .required('Point is required')
        .moreThan(9999999, 'Point must be greater than 10,000,000'),
    secretKey: yup.string().required('Secret key is required'),
    email: yup.string().email('Invalid email').optional(),
}).required()

export type IUserRequest = yup.InferType<typeof UserRequestSchema>
//----------------------End----------------------//


/**
 * UserSchema is a schema for User response
 */
export const UserSchema = z.object({
    data: z.object({
        meta: z.object({
            current: z.number(),
            pageSize: z.number(),
            totalPage: z.number(),
            totalItem: z.number(),
        }),
        results: z.array(z.object({
            id: z.string(),
            ingame: z.string(),
            points: z.number(),
        })),
    }),
})
export const UserResponseSchema = BackendResponseSchema(UserSchema);
export type IUser = z.TypeOf<typeof UserResponseSchema>
//----------------------End----------------------//


/**
 * TimerSchema is a schema for Timer, status active
 */
const TimerActiveSchema = z.object({
    _id: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    typeMge: z.string(),
    pointsLimit: z.number(),
    status: z.string(),
})
export type ITimerLeftActive = z.TypeOf<typeof TimerActiveSchema>
//----------------------End----------------------//


/**
 * TimerSchema is a schema for Timer, status completed
 */
const TimerCompletedSchema = z.object({
    _id: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    typeMge: z.string(),
    pointsLimit: z.number(),
    status: z.string(),
    users: z.array(z.object({
        id: z.string(),
        ingame: z.string(),
        points: z.number(),
        date: z.string(),
    }))
})

export type ITimerCompleted = z.TypeOf<typeof TimerCompletedSchema>
//----------------------End----------------------//


/**
 * HistorySchema is a schema for History
 */
const HistorySchema = z.object({
    id: z.string(),
    ingame: z.string(),
    points: z.number(),
    description: z.string(),
    createdAt: date(),
})

export const HistoryResponseSchema = BackendResponseSchema(HistorySchema);
export type IHistory = z.TypeOf<typeof HistoryResponseSchema>