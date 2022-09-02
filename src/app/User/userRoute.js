const passport = require('passport');
const secret = require('../../../config/secret');
const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
const userProvider = require("../../app/User/userProvider");
const userService = require("../../app/User/userService");

module.exports = function(app){
    const user = require('./userController');
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const path = require('path');
    const passport = require('passport');
    // 0. 테스트 API
    app.get('/test',user.getTest);

    // 혜연

    app.get('/intro',user.getIntro); // 배경이미지
    app.get('/searchicon',user.getSearch);
    app.get('/searchPage',user.searchPage);
    app.get('/searchAll',user.searchAll);
    app.get('/pointericon',user.getPointer);

    // 1. 메인 API
    app.get('/',user.getMain);
    app.get('/menuicon',user.getIcon);

    // 찜 목록
    app.get('/likeicon', user.wishlistPageIn);
    app.get('/wishListPage', user.wishListPage);
    app.get('/content_ex', user.contentImage);

    // 설문조사 페이지
    app.get('/surveyPage', user.surveyPage);

    // 2. 로그인 페이지 HTML
    app.get('/loginicon',user.getLogin);
    app.get('/logouticon',user.getLogout);
    app.get('/loginPage',user.loginPage);
    app.get('/kakaoicon',user.getkakao);
    app.get('/navericon',user.getnaver);

    // 3. 회원가입 페이지 HTML
    app.get('/signUpPage',user.signUpPage);


    // 4. 회원가입 API
    app.post('/users', user.postUsers);

    // 5. 로그인 하기 API (JWT 생성)
    app.post('/login', user.login);

    app.get('/logout' ,user.logout);

    app.post('/interests');

    app.get('/exampleImage',user.getExample);
    app.get('/exampleImage2',user.getExample2);
    app.get('/exampleImage3',user.getExample3);

    // 6. 카카오 로그인 API
    app.post('/kakao-login',user.kakaoLogIn);
    app.get('/kakao', passport.authenticate('kakao-login'));
    app.get('/kakao/oauth', passport.authenticate('kakao-login', {
        failureRedirect : '/',
    }), (req, res) => {
        res.redirect('/');
    });

    app.get('/naver',passport.authenticate('naver',{authType:'reprompt'}));
    app.get(
        '/auth/naver/callback',
        passport.authenticate('naver',{failureRedirect:'/'}),
        (req,res)=> {
            res.redirect('/');
        },
    );
    //JWT 검증 API
    app.get('/auto', jwtMiddleware, user.check);
    app.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));
    app.get('/auth/naver/callback',user.getMain)



    passport.use(
        new NaverStrategy(
           {
              clientID: secret.NAVER_ID,
              clientSecret: secret.NAVER_SECRET,
              callbackURL: '/auth/naver/callback',
              state : "RAMDOM_STATE"
           },
           async (accessToken, refreshToken, profile, done) => {
              console.log('naver profile : ', profile);
              try {
                const exId = profile.nickname;
                const Name = profile.name;
                const sex = profile.gender;
                const email = profile.email;
                const password = "naver";
                const userNum = profile.mobile;
                const id = await userProvider.retrieveUser(exId);
                if(id==undefined){
                    const signUpResponse = await userService.createUser(
                        exId, Name, 0 , sex, email, password, userNum
                    );
                    done(null);
                } else {
                    app.post('/login',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            userId:exId,
                            password:password			
                        })
                    });
                    
                    done(null);
                }

                
                 // const exUser = await User.findOne({
                 //    // 네이버 플랫폼에서 로그인 했고 & snsId필드에 네이버 아이디가 일치할경우
                 //    where: { snsId: profile.id, provider: 'naver' },
                 // });
                 // // 이미 가입된 네이버 프로필이면 성공
                 // if (exUser) {
                 //    done(null, exUser);
                 // } else {
                 //    // 가입되지 않는 유저면 회원가입 시키고 로그인을 시킨다
                 //    const newUser = await User.create({
                 //       email: profile.email,
                 //       nick: profile.name,
                 //       snsId: profile.id,
                 //       provider: 'naver',
                 //    });
                 //    done(null, newUser);
                 // }
              } catch (error) {
                 console.error(error);
                 done(error);
              }
           },
        ),
     );
};


