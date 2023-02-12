/** Construct a type like `T`, except the values `K` are Required (must exist). */
export type RequireSome<T, K extends keyof T> = T & Pick<Required<T>, K>;

export type Timeout = ReturnType<typeof setTimeout>;
export type Interval = ReturnType<typeof setInterval>;
