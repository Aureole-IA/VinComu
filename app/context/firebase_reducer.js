
import {LOGED_USER} from '../types'
import {REGISRY_DETAIL,NEW_REGISTRY} from '../types'
import {USER_UID,USER_HAS_DATA,USER_DATA} from '../types'
export default (state, action)=>{
    switch (action.type) {        
        case LOGED_USER:
           return{ 
               ...state,
               logedState:action.payload
            }
        case USER_UID:
            return{ 
                ...state,
                user_uid:action.payload
                }
        case REGISRY_DETAIL:
            return{ 
                ...state,
                registry_detail:action.payload
                }
        case USER_HAS_DATA:
            return{ 
                ...state,
                userHasData:action.payload
                }
        case USER_DATA:
            return{ 
                ...state,
                userData:action.payload
                }
        case NEW_REGISTRY:
            return{ 
                ...state,
                newRegistry:action.payload
                }
        default:
            return state;
    }
}