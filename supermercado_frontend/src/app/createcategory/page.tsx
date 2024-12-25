import {useEffect, useState} from 'react'
import { deleteCategory, getCategoryList, postCategory } from '../../service/api'


const CreateCategory : React.FC = () =>{
    const [categoruIdentifier,setCategoruIdentifier] = useState<string>('')
    const [listCategory, setListCategory] = useState<{id: number; nome: string}[]>([])
    
    const categoryCreate = async () =>{
    try{
        const respondeseCategory = await postCategory(categoruIdentifier)
        alert(`Categoria criada com sucesso: ${categoruIdentifier}`)
        setCategoruIdentifier('')
        await fetchCategory()
    }catch(err){
        console.error('Erro ao cadastrar a cateogoria.')
    }
    }

    const fetchCategory = async () =>{
        try{
            const response  = await getCategoryList()
       
            setListCategory(response)

        }catch(err){
            console.error('Erro no listamentto das categorias')
        }
    }

    const handleDelete = async(id:number) =>{
        try{
            await deleteCategory(id)
            alert('Categoria exclida com sucesso')
            await fetchCategory()
        }catch(err){
            alert(`Erro ao tentar excluir categoria.`)
        }
    }
 

    useEffect(()=>{
        fetchCategory()
    },[])

    return(
        <div>
            <input 
            type="text"
            value={categoruIdentifier}
            onChange={(e)=>setCategoruIdentifier(e.target.value)}
            placeholder='Digita o nome do caterogoria'
             />
             <button onClick={categoryCreate}>Adicionar categoria</button>

            <div>
                {listCategory.map((category,index)=>{
                    return(
                        <li key={index} className='list-none'>
                
                           {category.id} -
                           {category.nome}-
                 
                            <button onClick={()=>handleDelete(category.id)}>Excluir</button>
                        </li>
                    )
                })}
            </div>
        </div>
    )
}
export default CreateCategory