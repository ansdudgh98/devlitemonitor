import {useLocation} from "react-router";
import {jsonValue} from "./JsonFile";
import {useNavigate} from "react-router-dom";
import "./Guide.css"

const GrafanaGuidePage = () => {
    const data = useLocation();
    const navigate = useNavigate();

    const handleCopyClipBoard = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            alert('json파일이 복사되었습니다. 가이드에 나온대로 붙여넣기 해주세요.');
        } catch (e) {
            alert('복사에 실패하였습니다');
        }
    };


    const jsonFilePrint = () => {
        const value = jsonValue(data.state);
        handleCopyClipBoard(value);
    }

    const jsonUUIDPrint = () => {
        const value = data.state
        handleCopyClipBoard(value);
    }


    return (
        <div className="container-xxl">
            <a className="navbar-brand brandcontrol control fs-1 fw-bold" href="/">Devlite monitor</a>
            <button type="button" className={"btn btn-primary control"} onClick={() => { window.open('https://sprinkle-radium-ba3.notion.site/Test-Page-2607eb9aa0404086869e107d0cd9578a?pvs=4', '_blank', 'width=800, height=800')}}>식별자 설정 방법</button>
            <button type="button" className={"btn btn-primary control"} onClick={jsonUUIDPrint} >uuid 복사 하기</button>
            <button type="button" className={"btn btn-primary control"} onClick={jsonFilePrint} >JSON 복사 하기</button>
            <button type="button" className={"btn btn-primary control"} onClick={() => {navigate("/")}}>홈으로 이동하기</button>
        </div>
    )
}


export default GrafanaGuidePage;