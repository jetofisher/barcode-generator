import React from "react";

const InputBox = ({ onInputChange }) => {
    return (
        <form className="pa2 black-80">
            <div className="mt2 InputContainer" >
                <textarea
                    id="data"
                    name="data"
                    className="db border-box hover-black w-100 measure ba b--black-20 pa2 br2 mb2"
                    placeholder={'Examples:\n028200136800\n028200004314 - Marlboro Red\n"028200135803", "Marl SP"'}
                    type='text'
                    onChange={onInputChange} />
            </div>
        </form>
    );
}
export default InputBox;