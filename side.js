/* rtk-query endPoint builder simulation */
const father = ()=>{
    let coins = 3

    return (childName)=>{
        coins --

        if (coins > 0) {
            console.log(childName + ' still has ' + coins + " cions left");
        }else {
            coins = 0
            console.log(childName + ' has ' + coins + " cions left");
        }

    }
}

const sonA = father()
const sonB = father()

/* sonA('hadi')
sonA('hadi')
sonA('hadi')
sonB('milad')
sonB('milad') */


function Builder(){

    this.qData = {
        url:"",
        posts:{
            "1":{
                id:1,
                username:"hadi"
            },
            "2":{
                id:2,
                username:"milad"
            }
        }
    }
    this.mData = {
        url:"",
        body:[],
        method: "",
        message:"post has been created!"
    }
    this.uQuery = undefined
    this.mQuery = undefined

    this.query =({query})=>{
        this.uQuery = query
    }

    this.mutation = ({query})=>{
        this.mQuery = query
    }

    this.useQuery = ()=>{
        const url = this.uQuery()
        this.qData.url = url
        return this.qData.posts 
    }

    this.useMutation = (data)=>{
        const res = this.mQuery(data)
        const {url , body , method} = res
        this.mData.url = url
        this.mData.body = body
        this.mData.method = method
        return this.mData.message
    }
}

const builder = new Builder()


builder.query({
    query: ()=> "http://localhost:3500/posts"
})

builder.mutation({
    query: (data)=> ({
        url:`http://localhost:3500/posts`,
        body: {...data},
        method:"POST"
    })
})

const {useQuery , useMutation} = builder

const posts = useQuery()
const response = useMutation({id:5})

console.log(posts);
console.log(response);


/* Adaptor pattern */

function AppleCharger(name){

    this.name = name

    this.chargeApple  =()=>{
        console.log(this.name + " is charging");
    }
}

function HonorCharger(name){

    this.name = name

    this.chargeHonor = ()=>{
        console.log(this.name + " is charging");
    }
}

function AppleAdaptor(){

    this.chargeHonor = (appleI)=>{
        appleI.chargeApple(appleI.name)
    }
}

const iphone = new AppleCharger('iphone X')
const honor = new HonorCharger('honor 8')

iphone.chargeApple()
honor.chargeHonor()

const adaptor = new AppleAdaptor()

adaptor.chargeHonor(iphone)




/* compesition */

function Walker({name}){
    return {
        walk:()=> console.log(name + " walks")
    }
}

function Biter({name}){
    return {
        bite:()=> console.log(name + " bites")
    }
}

function Swimmer({name}){
    return{
        swim:()=> console.log(name + " swims")
    }
}


function BiterMonster(name){
    const monster = {name}

    return{
        ...monster,
        ...Biter(monster)
    }
}

function BiterAndSwimmerMonster(name){
    const monster = {name}

    return{
        ...monster,
        ...Biter(monster),
        ...Swimmer(monster)
    }
}

const monster = BiterAndSwimmerMonster("seaDrag")

monster.bite()
monster.swim()


/* solid open/closed principle*/


function TwoAnswerType(description , answers){

        this.printOut = ()=>{
            console.log("");
            console.log("");
            console.log(description);
            console.log(answers[0]);
            console.log(answers[1]);
            console.log('_____________________________________');
        }
}

function ThreeAnswerType(description , answers){
        this.printOut = ()=>{
            console.log("");
            console.log("");
            console.log(description);
            console.log(answers[0]);
            console.log(answers[1]);
            console.log(answers[2]);
            console.log('_____________________________________');
        }
}

const Questions = [
    new TwoAnswerType("1. what is ip?",["a) internet protocol","b) internatioal police"]),
    new ThreeAnswerType("2. which one makes element bigger?",["a) translate(2rem)","b) rotate(45deg)" , "c) scale(1.5)"])
]


function showQuestion(){
    Questions.forEach(q=>{
        q.printOut()
    })
}
showQuestion()


/* command pattern */


function Commander(){
    this.commands = []
    this.current  = 0

    this.doFunc = (command)=>{
        this.commands.push(command)
        this.current = command.done(this.current)
    }

    this.unDoFunc = ()=>{
       const command = this.commands.pop()
       this.current = command.unDone(this.current)
    }
    
}

function add(num){
    return{
        done: (current)=>{
            current += num
            return current
        },
        unDone:(current)=>{
            current -= num
            return current
        }
    }
}
function multiply(num){
    return{
        done: (current)=>{
            if(current === 0) current = 1
            current *= num
            return current
        },
        unDone:(current)=>{
            current /= num
            return current
        }
    }
}

function adderAndMultiply(addNum , multNum){
    const adder = add(addNum)
    const multer = multiply(multNum)
    return{
        done:(current)=>{
            const newVlaue = adder.done(current)
            return multer.done(newVlaue)

        },
        unDone:(current)=>{
            const divide = multer.unDone(current)
            return adder.unDone(divide)
        }
    }
}

const adderCommander = new Commander()

const I = multiply(2)

adderCommander.doFunc(I)
adderCommander.doFunc(I)
adderCommander.doFunc(I)
adderCommander.unDoFunc()


console.log(adderCommander.current)


/* recursion example */

const artists = {
    american:["taylor" ,"katy"],
    turkish:{
        pop:["hadise , murat"],
        traditional:{
            elder:['ebru' , "ibo"],
            newer:['aziz']
        }
    },
    iranian:{
        pop:["yeganeh" ,'bani'],
        traditional:{
            elder:{
                men:["MR.shajarian"],
                women:["mahasti"],
            },
            newer:["H.shajarian" , "homay"]
        }
    }
}



const artistFounder = (artMans , fullArray = [])=>{

    Object.keys(artMans).forEach(key=>{
        if (Array.isArray(artMans[key])) {
            artMans[key].forEach(artist=> {
                fullArray.push(artist)
            })
        }else{
            artistFounder(artMans[key] , fullArray)
        }

        //OR

/*         if (Array.isArray(artMans[key])) {
            return artMans[key].forEach(artist=> {
                fullArray.push(artist)
            })
        }
        artistFounder(artMans[key] , fullArray) */

    })
    return fullArray
}
const allArtists = artistFounder(artists)
console.log(allArtists);


/* decorator pattern with curring*/

const S = (w,l)=>{
    return w*l
}

const decorator = (fn)=>{
    return (w,l)=>{
        const res = fn(w,l)
        return res + " S of square"
    }
}

const beauty = (fn)=>{
    return (w,l)=>{
        const res = fn(w,l)
        return "this is "+ res 
    }
}

const brace = (fn)=>{
    return (w,l)=>{
        const res = fn(w,l)
        return `[${res}]`
    }
}

const d = decorator(S)
const b = beauty(d)
const o = brace(b)
const o2 = brace(o)
const s = o2(2,5)

const pipe = (...fns)=> (val)=> fns.reduce((prev , fn) => fn(prev) , val) 

const pipeI = pipe(decorator , beauty , brace , brace,brace)

const lastFn = pipeI(S)

console.log(lastFn(4,5));

console.log(s);

/* chaching */

const memoize = (fn)=>{
    const cache = {}

    return (...args)=>{
        if(args.toString() in cache){
            console.log(cache);
            return cache[args.toString()]
        }

        const result = fn(...args)
        cache[args.toString()] = result    
        return result    
    }
}

const fib = (num)=>{
    if (num < 2) {
        return num
    }
    return fib(num-1) + fib(num-2)
}

const myFib = memoize(fib)


console.log(myFib(40));
console.log(myFib(40));
console.log(myFib(10));


/* curring */


const currFunc = (a)=>{
    return (b)=>{
        return a*b
    }
}

const cF1 = currFunc(2)
console.log(cF1(5));