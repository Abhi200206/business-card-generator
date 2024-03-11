import { Cardsatom } from '../store/atoms/store'
import { useRecoilValueLoadable } from 'recoil';
export default function Rendercards() {
    let id = 0;
    let atomval = useRecoilValueLoadable(Cardsatom);
    console.log(atomval);
    if (atomval.state == "hasValue") {
        let elements = atomval.contents.map((val) => {
            console.log("errrrr: ",atomval.contents);
            return (
                <div key={id++} className='border-[1px] my-2 rounded p-2 flex justify-center'>
                    <div>
                        <h2>{val.name}</h2>
                        <p>{val.description} </p>
                        <p className='text-[18px] font-black '>Intersts</p>
                        <h5>{val.intrests.split(",").map((v) => <h5>{v}</h5>)}</h5>
                        <div className='flex gap-2'>
                            <button className=' bg-black text-white text-center cursor-pointer rounded p-2 px-4 mt-2'><a href={val.linkedurl}>Linkedin</a></button>
                            <button className=' bg-black text-white text-center cursor-pointer rounded p-2 px-4 mt-2'><a href={val.twitterurl}>Twitter</a></button>
                        </div>
                        <br />
                    </div>
                </div>
            )
        })
        return elements;

    }
    else if (atomval.state == "loading") {
        let arr=[];
        for(let i=0;i<4;i++)
        {
            arr.push( <div class="border border-blue-300 my-4 shadow rounded-md p-4 max-w-sm w-full mx-auto">
            <div class="animate-pulse flex space-x-4">
                <div class="rounded-full bg-slate-200 h-10 w-10"></div>
                <div class="flex-1 space-y-6 py-1">
                    <div class="h-2 bg-slate-200 rounded"></div>
                    <div class="space-y-3">
                        <div class="grid grid-cols-3 gap-4">
                            <div class="h-2 bg-slate-200 rounded col-span-2"></div>
                            <div class="h-2 bg-slate-200 rounded col-span-1"></div>
                        </div>
                        <div class="h-2 bg-slate-200 rounded"></div>
                    </div>
                </div>
            </div>
        </div>)
        }
        return (
           <div>
            {arr}
           </div>
        )
    }
    else if (atomval.state == "hasError") {
        return <div>
            error at server.
        </div>
    }
}