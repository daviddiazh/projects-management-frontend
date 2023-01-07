import { addErrorReducer, checkingReducer, signInReducer } from "./authSlice";
import projectsManagement from '../../api/api';
import { clearBusinessIdAndName } from "../business/businessSlice";

interface SignUpProps {
    name: string;
    lastName: string;
    phone: string; 
    email: string; 
    password: string;
    businessId: string;
}

export const signUp_thunk = ({ name, lastName, email, password, phone, businessId }: SignUpProps) => {
    return async ( dispatch: any ) => {

        dispatch( checkingReducer() );
        
        const cellphone = parseInt( phone );

        console.log('entro al sign in')
        projectsManagement.post(`/auth/signUp`, {
            name, 
            lastName, 
            email, 
            password, 
            phone: cellphone, 
            businessId,
        })
            .then(({ data, status }) => {
                if (status !== 201) {
                    throw new Error(data.message);
                }
                
                localStorage.setItem('token', data.token);
                dispatch( signInReducer( data ) );
            })
            .catch(error => {
                try {
                    // console.log(error.response.data.message);
                    dispatch( clearBusinessIdAndName() );
                    dispatch( addErrorReducer(error.response.data.message) );
                } catch (error) {
                    console.error(error);
                }
            });
    }
}
