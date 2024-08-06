const COUNTRIES=['Bangladesh','Brazil','China','Finland',
                  'France','Germany','Greece','Iceland',
                  'India','Indonesia','Italy','Japan',
                  'Mexico','Nigeria','Norway',
                  'Pakistan','Russia','US']
const FANTASY=new Map([
  ['Aasimar',['Italy','Greece']],
  ['Dwarf',['Germany','Norway']],
  ['Elf',['Iceland','Finland']],
  ['Halfling',['Brazil','Mexico']],
  ['Human',['US','France']],
  ['Lacerta',['Japan','Indonesia']],//lizard-folk
  ['Orc',['Pakistan','Nigeria','Germany','Norway']],
  ['Tiefling',['Pakistan','Nigeria']],
])
const KEYS=['male','female','family','noun']

class Language{
  constructor(namesp=false){
    let names=new Map(KEYS.map(key=>[key,[]]))
    this.names=names
    if(!namesp) return
    names.get('family').push(...this.split(namesp.family))
    names.get('female').push(...this.split(namesp.female))
    names.get('male').push(...this.split(namesp.male))
    for(let k of KEYS.slice(0,-1)) names.get('noun').push(...names.get(k))
  }
  
  split(names){return names.map(n=>n.toLowerCase().split('.'))}
  
  roll(names){return names[rpg.low(0,names.length-1)]}
  
  generate(namesp){
    let names=this.names.get(namesp)
    let n=this.roll(names)
    n[0]=this.roll(names)[0]
    let l=n.length
    for(let i=1;i<l-1;i++){
      let mid=false
      while(!mid){
        mid=this.roll(names)
        mid=mid.length>2&&rpg.pick(mid.slice(1,-1))
      }
      n[i]=mid
    }
    if(l>1){
      let last=false
      while(!last){
        last=this.roll(names)
        last=last.length>1&&last[last.length-1]
      }
      n[l-1]=last
    }
    n=n.join('').replaceAll(' ','-')
    if(n.length<3||n[n.length-1]=='-') 
      return this.generate(namesp)
    return n[0].toUpperCase()+n.slice(1)
  }
  
  get male(){return this.generate('male')}
  
  get female(){return this.generate('female')}
  
  get family(){return this.generate('family')}
  
  get noun(){return this.generate('noun')}
  
  merge(language){
    let names=language.names
    for(let key of names.keys())
      this.names.get(key).push(...names.get(key))
  }
}

class RPG{
  roll(min,max){return Math.floor(Math.random()*(max-min+1))+min}

  pick(array){return array[this.roll(0,array.length-1)]}

  low(min,max){return Math.min(this.roll(min,max),this.roll(min,max))}
}

export var countries=new Map()//country:language
export var fantasy=new Map()//country:language

var rpg=new RPG()

export async function setup(){
  let path=import.meta.url
  path=path.slice(0,path.indexOf('eloquium.js'))
  for(let c of COUNTRIES){
    let names=await fetch(`${path}/data/${c.toLowerCase()}.json`)
    names=await names.json()
    countries.set(c,new Language(names))
  }
  for(let f of FANTASY.keys()){
    let l=new Language()
    fantasy.set(f,l)
    for(let country of FANTASY.get(f))
      l.merge(countries.get(country))
  }
  return Promise.resolve()
}

export function seed(rpgp){rpg=rpgp}
