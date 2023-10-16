import {useState} from "react";
import {axiosInstance} from "../../config/axiosInstance";
import "./AccountCreate.css";
import {useNavigate} from "react-router-dom";
const GrafanaOrgAccountCreatePage = () => {

    const [grafanaId, setGrafanaId] = useState("");
    const [grafanaPw, setGrafanaPw] = useState("");
    const [grafanaEmail, setGrafanaEmail] = useState("");
    const [grafanaName, setGrafanaName] = useState("");

    const [validationGrafanaId, setValidationGrafanaId] = useState(false);
    const [validationGrafanaPw, setValidationGrafanaPw] = useState(false);
    const [validationGrafanaEmail, setValidationGrafanaEmail] = useState(false);
    const [validationGrafanaName, setValidationGrafanaName] = useState(false);
    const [errorStyle , setErrorStyle] = useState(false);
    const navigate = useNavigate();

    const handleInputId = e => {
        setGrafanaId(e.target.value);

        if (!lengthValidation(e)) {
            setValidationGrafanaId(false);
            return;
        }

        setValidationGrafanaId(true);
    }

    const handleInputPw = e => {
        setGrafanaPw(e.target.value);

        if (!lengthValidation(e)) {
            setValidationGrafanaPw(false);
            return;
        }
        setValidationGrafanaPw(true);
    }

    const handleInputEmail = e => {
        setGrafanaEmail(e.target.value);

        const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])/;

        if (!emailRegEx.test(e.target.value) || !lengthValidation(e)) {
            setValidationGrafanaEmail(false);
            console.log("validation")
            return;
        }

        setValidationGrafanaEmail(true);

    }



    const handleInputGrafanaName = e => {
        setGrafanaName(e.target.value);

        if (!lengthValidation(e)) {
            setValidationGrafanaName(false);
            return;

        }
        setValidationGrafanaName(true);

    }

    const lengthValidation = e => {
        if (e.target.value.length === 0) {
            return false;
        }

        return true;
    }

    const accountCreateForm = e => {
        e.preventDefault();

        if(!validationGrafanaId || !validationGrafanaPw || !validationGrafanaEmail || !validationGrafanaName) {
            alert("양식을 지켜주세요!");
            setErrorStyle(true);
            return;
        }
        setErrorStyle(false);

        accountCreateAPI();

    }

    const accountCreateAPI = async () => {
        await axiosInstance.post("/grafana/createAccount",{
            "grafanaId": grafanaId,
            "grafanaPw": grafanaPw,
            "grafanaEmail": grafanaEmail,
            "name" : grafanaName,
        }).then(() => {
            navigate("/");
            console.log("계정 생성 완료")
        }).catch((err)=>{
            alert("계정 생성에 실패하였습니다.")
            console.log("err:"+err);
        })
    }

    return (
        <>
        <a className="navbar-brand brandcontrol control fs-1 fw-bold" href="/">Devlite monitor</a>
        <div className="container-xxl">
            <div className="vstack gap-xxl-5 rounded border border-primary">
                <form id="accountForm">
                    <input type={"text"}
                           className={`control rounded border`}
                           id={"grafanaId"} onChange={handleInputId} placeholder="grafana account ID"/>
                    {
                            <label style={{
                                visibility : `${errorStyle ? 'visible' : 'hidden' }`,
                                color: "red",
                                lineHeight: 2.5
                            }
                            }>
                                아이디는 1글자 이상이여야 합니다!
                            </label>
                    }

                    <input type={"password"} className={`control rounded border`} id={"grafanaPw"} onChange={handleInputPw} placeholder="grafana accountPW"/>
                    {
                        !validationGrafanaPw ? (
                            <label style={{
                                visibility : `${errorStyle ? 'visible' : 'hidden' }`,
                                color: "red",
                                lineHeight: 2.5
                            }}>
                                비밀번호는 1글자 이상이여야 합니다!
                            </label>
                        ) : null
                    }

                    <input type={"email"} className={`control rounded border`} id={"grafanaEmail"} onChange={handleInputEmail} placeholder="grafana email"/>
                    {

                            <label style={{
                                visibility : `${errorStyle ? 'visible' : 'hidden' }`,
                                color: "red",
                                lineHeight: 2.5
                            }}>
                                이메일 양식을 지켜주세요!
                            </label>

                    }
                    <input type={"text"} className={`control rounded border`} id={"grafanaName"} onChange={handleInputGrafanaName} placeholder="grafana name"/>
                    {

                        !validationGrafanaName ? (
                            <label
                                style={{
                                visibility : `${errorStyle ? 'visible' : 'hidden' }`,
                                color: "red",
                                lineHeight: 2.5,
                            }}>
                                그라파나 계정 이름은 1글자 이상이여야 합니다!
                            </label>
                        ) : null
                    }
                    <br/>
                    <button type="button"
                            style={{
                                width : "100px",
                                margin : "0 0 0 72%"
                            }}
                            onClick={accountCreateForm} className="btn btn-secondary">회원가입</button>
                </form>
            </div>
        </div>
        </>
    );
}


export default GrafanaOrgAccountCreatePage;