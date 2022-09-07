module.exports = function(app){
    const secret = require('../../../config/secret');
    const { Strategy: NaverStrategy, Profile: NaverProfile } = require('passport-naver-v2');
    const userProvider = require("../../app/User/userProvider");
    const userService = require("../../app/User/userService");
    const { response } = require('express');
    const KakaoStrategy = require('passport-kakao').Strategy;

    const user = require('./userController'); 
    const jwtMiddleware = require('../../../config/jwtMiddleware');
    const path = require('path');
    const passport = require('passport');
    // 0. 테스트 API
    app.get('/test',user.getTest);

    // 4. 회원가입 API
    app.post('/users', user.postUsers);

    // 5. 로그인 하기 API (JWT 생성)
    app.post('/login', user.login);

    app.get('/logout' ,user.logout);

    app.post('/interests');

    app.get('/exampleImage',user.getExample);
    app.get('/exampleImage2',user.getExample2);
    app.get('/exampleImage3',user.getExample3);


    //JWT 검증 API
    app.get('/auto', jwtMiddleware, user.check);
    app.get('/naver', passport.authenticate('naver', { authType: 'reprompt' }));

    app.get(
        '/auth/naver/callback',
        passport.authenticate('naver',{failureRedirect:'/'}),
        (req,res)=> {
            res.
            res.redirect('/test');
        },
    );

    passport.use(
        new NaverStrategy(
           {
              clientID: secret.NAVER_ID,
              clientSecret: secret.NAVER_SECRET,
              callbackURL: '/auth/naver/callback',
              state : "RAMDOM_STATE"
           },
           async (accessToken, refreshToken, profile, done,req,res) => {
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
                    console.log("회원가입")
                    const signUpResponse = await userService.createUser(
                        exId, Name, 0 , sex, email, password, userNum
                    );
                    done(null);
                } else {
                    
                    done(null);
                }

              } catch (error) {
                 console.error(error);
                 done(error);
              }
           },
        ),
     );

     app.get('/kakao', passport.authenticate('kakao'));
     app.get('/kakao/oauth',
     passport.authenticate('kakao',{
        failureRedirect: '/',
     }),
        (req,res) => {
            res.redirect('/');
        },
     );
    
     passport.use(
        new KakaoStrategy(
            {
            clientID: '5898d4ba2fdda040b411119996107a41',
            callbackURL: '/kakao/oauth',
            clientSecret: 'tYgFpoReW7PJROELU6dWSn1HYCBXCGmh'},
            async (accessToken, refreshToken, profile, done) =>
            {
                console.log(profile);
                done(null);
            }
            
        )
     );
};