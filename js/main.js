

/**
 *  slide list 클릭시 해당 slide 나타내기
 *  querySelectorAll를 사용했을 시 forEach 함수를 이용해서 각각의 객체에 이벤트를 부여한다 
 */

let slideListBtn = document.querySelectorAll('#navBar ul li');
let slideListName = [];
[].forEach.call(slideListBtn,function(col){ 

    slideListName.push(col.className);

	col.addEventListener("click",function(e){

        // 클릭한 slide 찾아서  active class add
        let activeSlide = e.target.className ;
        let slide = document.querySelector(`main#content div#${activeSlide}`);
        slide.classList.add('active');

        // 클릭한 슬라이드의 형제 슬라이들에 active class remove
        let contentDiv = 'main#content div#'
        removeSiblingsClass(slideListName,contentDiv,'active',activeSlide);

        // 슬라이드에 따른 이벤트 부여
        if( activeSlide === 'slideA' ){
            slideAFunc();
        } else if( activeSlide === 'slideB' ){
            slideBFunc();
        }
    }); 

}); 




/* slide left, right Btn */
let leftBtn = document.querySelector('#content .moveController button.left');
let rightBtn = document.querySelector('#content .moveController button.right');

/* slide A */
const slideAFunc = function(){

    // left right btn
    let slideAWrap = document.querySelector('#slideA .slideWrapper');
    let slideAWidth = document.querySelector('#slideA .slideImg').clientWidth;
    let slideAIdx = 0 ;

    rightBtn.addEventListener('click',function(){
        if( slideAIdx > 3 ){
            slideAIdx = 0 ;
        } else {
            slideAIdx ++ ;
        }
        slideAWrap.style.transform = `translateX(-${slideAWidth*slideAIdx}px)`
    });

    leftBtn.addEventListener('click',function(){
        if( slideAIdx < 1 ){
            slideAIdx = 5 ;
        };
        slideAIdx -- ;
        slideAWrap.style.transform = `translateX(-${slideAWidth*slideAIdx}px)`
    });
}

/* slide B */
const slideBFunc = function(){

    // left right btn
    let slideBWrap = document.querySelector('#slideB .slideWrapper');
    let slideBWidth = document.querySelector('#slideB .slideImg').clientWidth;
    let slideBIdx = 0 ;
    rightBtn.addEventListener('click',function(){
        if( slideBIdx > 3 ){
            slideBIdx = 0 ;
        } else {
            slideBIdx ++ ;
        }
        slideBWrap.style.transform = `translateX(-${slideBWidth*slideBIdx}px)`
    });

    leftBtn.addEventListener('click',function(){
        if( slideBIdx < 1 ){
            slideBIdx = 5 ;
        };
        slideBIdx -- ;
        slideBWrap.style.transform = `translateX(-${slideBWidth*slideBIdx}px)`
    });


    // slide speed control
    let wrapperSpeedControl = document.querySelector('main #slideB .wrap .slideWrapper')
    let speedControlBtn = document.querySelectorAll('#slideB .speedControl ul li');
    let speedArr = [];
    [].forEach.call(speedControlBtn,function(btn){
        speedArr.push(btn.id);
        btn.addEventListener("click",function(e){

            // 클릭한 li에 on class add
            let speed = e.target.id;
            let speedOn = document.querySelector(`#slideB .speedControl ul li#${speed}`);
            speedOn.classList.add('on');

            if( speed === 'slow' ){
                wrapperSpeedControl.style.transition = '1.2s' ;
            } else if( speed === 'medium' ){
                wrapperSpeedControl.style.transition = '0.6s' ;
            } else if( speed === 'fast' ){
                wrapperSpeedControl.style.transition = '0.1s' ;
            };

            // 클릭한 li의 형제요소에 remove on class
            let contentDiv = '#slideB .speedControl ul li#'
            removeSiblingsClass(speedArr,contentDiv,'on',speed);
        });
     })

};


/* 공통기능 */
//형제 요소 클래스 제거
const removeSiblingsClass = function(array,contentDiv,removeClassName,activeElement){
    /**
     * 작동 할 요소를 제외한 형제 요소들의 작동클래스를 제거하는 function
     * 
     * array - 형제요소들을 담고있는 배열
     * contentDiv - 클래스를 제거 할 셀렉터
     * removeClassName - 제거 할 클래스 이름
     * activeElement - 제거하면 안될 요소의 className (현재 작동 중)
     */
    return array.map(( item ) => {
        if( item !== activeElement ){
            let hideSlide = document.querySelector(`${contentDiv}${item}`);
                if( hideSlide.classList.contains(removeClassName)){
                    hideSlide.classList.remove(removeClassName);
                }
        } 
    });
}




slideAFunc();
