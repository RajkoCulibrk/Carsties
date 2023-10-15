import { createWithEqualityFn } from "zustand/traditional"

type State = {
    pageNumber:number,
    pageSize: number,
    pageCount:number,
    searchTerm: string,
    searchValue: string,
    orderBy:string,
    filterBy:string,
}

type Actions = { 
    setParams:(params:Partial<State>) => void
    reset: () => void
    setSearchValue:(searchValue: string) => void
}

const initialState : State = {
    pageCount:1,
    pageNumber:1,
    pageSize:12,
    searchTerm:"",
    searchValue:"",
    orderBy: "make",
    filterBy: "live"
}

export const useParamsStore = createWithEqualityFn<State & Actions>()((set)=>{
    return {
        ...initialState,
        setParams: (newParams: Partial<State>) => {
            set((state)=>{
                if(newParams.pageNumber){
                    return {...state, pageNumber: newParams.pageNumber}
                }else{
                    return {...state, ...newParams, pageNumber:1}
                }
            })
        },
        reset: () => set(initialState),
        setSearchValue:(searchValue:string) => set((state)=>({
            ...state,
            searchValue
        }))
    }
})