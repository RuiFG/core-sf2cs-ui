import _ from 'lodash'

export class RecognitionResult {
    constructor(data) {
        this.id=data.id
        this.peoples=[]
        if (_.isEmpty(data.peoples)){
            return
        }
        data.peoples.forEach((value)=>{
            this.peoples.push(new Detail(value))
        })
    }
}
function arrayBufferToBase64( buffer ) {
    let binary = ''
    const bytes = new Uint8Array(buffer)
    for (var i = 0; i < bytes.byteLength; i++) {
        binary += String.fromCharCode( bytes[ i ] );
    }
    return 'data:image/png;base64,'+window.btoa( binary );
}
class Detail {
    constructor(o) {
        this.peopleId=o.peopleId
        this.faceImg=arrayBufferToBase64(o.faceImgData)
        this.compareScore=o.compareScore
    }
}
