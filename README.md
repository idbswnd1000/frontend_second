echo "# frontend" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/idbswnd1000/frontend.git
git push -u origin main


git add .
git commit -m ""
git push -u


node_moduels 다시 설치 : npm install
server 띄우기 : npm run dev
router : npm install react-router-dom
CSS(style) : npm install styled-components


아이콘: npm install react-icons


=============================================================
reducer
dispatch: 함수를 실행하는 함수
action: 전체 object 인수
action.type: 함수의 타입
action.payload: state 변화시킬 수 있는 인수




useState => useReducer => useContext => redux


context: statem 내부함수(reducers)
redux: state, 내부함수(reducers), 외부함수(extraReducers: api)

