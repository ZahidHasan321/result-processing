export const INITIAL_STATE = {
    member1:'',
    member2:'',
    member3:'',
    member4:'',
    member5:'',
    role1:'',
    role2:'',
    role3:'',
    role4:'',
    role5:'',
}

export const memberReducer = (state, action) => {
    switch(action.type){
        case "MEMBER1":
            return{
                ...state,
                member1:action.payload
            }
        case "MEMBER2":
            return{
                ...state,
                member2:action.payload
            }
        case "MEMBER3":
            return{
                ...state,
                member3:action.payload
            }
        case "MEMBER4":
            return{
                ...state,
                member4:action.payload
            }
        case "MEMBER5":
            return{
                ...state,
                member5:action.payload
            }
        case "ROLE1":
            return{
                ...state,
                role1:action.payload
            }
        case "ROLE2":
            return{
                ...state,
                role2:action.payload
            }
        case "ROLE3":
            return{
                ...state,
                role3:action.payload
            }
        case "ROLE4":
            return{
                ...state,
                role4:action.payload
            }
        case "ROLE5":
            return{
                ...state,
                role5:action.payload
            }
        case "RESET":
            return{
                INITIAL_STATE
            }
        default:
            return state;
    }
}