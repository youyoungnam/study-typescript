

interface Hero {
    name: string;
    skill: string;
}


// : interface 하는게 type annotation 
// const capt: Hero = {
//     name: "capt",
//     skill: 'shield'
// }

// const capt: Hero = {} 


// as 방식 주의해서 사용
const capt: Hero = {}  as Hero 
capt.name = 'capt';
capt.skill = 'sheild';



// 
// const a: string | null;
// a!