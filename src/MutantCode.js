import React from 'react';
import './App.css';
import './MutantDisplay.css';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

/* Functional component that displays details about an individual mutant */
class MutantCode extends React.Component {
    makeCodePanel(code, lines, startLineNo) {
        return (
            <SyntaxHighlighter showLineNumbers
                language='python'
                style={docco}
                wrapLines='true'
                startingLineNumber={startLineNo}
                lineProps={(lineNum) => {
                    if (lines.includes(lineNum)) {
                        return { class : "mutation" };
                    }
                }}>{code}</SyntaxHighlighter>
        );
    }

    render() {
        const mutantLines = [this.props.mutant.mutated_lineno];
        return (
            <div style={{ maxWidth: '100%' }}>
                <script>hljs.initHighlightingOnLoad();</script>
                <div id="container">
                    <div class="panel panel1">
                        <h3>Original Code</h3>
                        {this.makeCodePanel(this.props.mutant.unmutated_output, 
                            mutantLines.map(x => x - this.props.mutant.mutated_output_lineno + 1), 
                            this.props.mutant.mutated_output_lineno)}
                    </div>
                    <div class="panel panel2">
                        <h3>Mutant Code</h3>
                        {this.makeCodePanel(this.props.mutant.mutated_output, 
                            mutantLines.map(x => x - this.props.mutant.unmutated_output_lineno + 1), 
                            this.props.mutant.unmutated_output_lineno)}
                    </div>
                    <div id="clear"></div>
                </div>
            </div>
        );
    }
};

export default MutantCode;