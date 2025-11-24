import { usePDF } from 'react-to-pdf';

const ReactToPDF = () => {  
    const { toPDF, targetRef } = usePDF({filename: 'react-to-pdf.pdf'});
    return (
        <>
        <div ref={targetRef}>
            Reacting to pdf
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>John</td>
                        <td>20</td>
                        <td>New York</td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td>Total</td>
                        <td>3</td>
                        <td>30</td>
                    </tr>
                </tfoot>
                <caption>
                    This is a table of names, ages, and cities
                </caption>
            </table>
        </div>
        <button onClick={() => toPDF()}>Download PDF</button>
        <hr>
        </hr>
        </>
    ) 
}

export default ReactToPDF;