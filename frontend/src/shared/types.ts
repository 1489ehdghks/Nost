export interface UserData {
    id: number;
    name: string;
    email: string;
}


export interface UserState {
    data: UserData | null;
    loading: boolean;
    error: string | null;
}

export interface AuthState {
    isLoggedIn: boolean;
    username: string | null;
}

//선택한 답변에 필요한 타입
export interface Choice {
    text: string;
    index: number;
    logprobs: null | any;
    finish_reason: string;
}