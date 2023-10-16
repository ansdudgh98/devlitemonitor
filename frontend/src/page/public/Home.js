import "./Home.css";

const Home = () => {


    return (
        <div className="container-xxl" >
            <div className="vstack gap-xxl-5 rounded border border-primary">
                <a className="align-items-start btn btn-primary btn-primary btn-lg"
                   href="https://backend.devlitemonitor.com/oauth2/authorization/kakao">카카오로 로그인 하기</a>
                <a className="align-items-start btn btn-primary btn-primary btn-lg" href="/grafanaOrgAccountCreate">조직
                    계정 만들기</a>
                <a className="align-items-start btn btn-primary btn-primary btn-lg" href="/grafanaAccountCreate">일반 계정
                    만들기</a>
            </div>
        </div>

    )
}

export default Home;