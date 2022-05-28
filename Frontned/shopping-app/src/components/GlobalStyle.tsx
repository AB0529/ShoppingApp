import { createGlobalStyle} from "styled-components"

export const GlobalStyles = createGlobalStyle<any>`
  body {
    background: ${({theme}) => theme.body};
    color: ${({ theme }) => theme.text};
    transition: all 0.50s linear;
  }
  .card-header {
    background: ${({ theme }) => theme.cardHeader};
  }
  .card {
    background: ${({theme}) => theme.cardBody};
    color: ${({ theme }) => theme.text};
  }
  .modal-dialog .modal-body {
    background: ${({theme}) => theme.cardBody};
    color: ${({ theme }) => theme.text};
  }
  .modal-header {
    background: ${({ theme }) => theme.cardHeader};
  }
  .tag {
    background: ${({theme}) => theme.tagBG};
  }
  .tag::after {
    background: ${({theme}) => theme.cardBody};
    border-left: 10px solid ${({theme}) => theme.tagBG};
  }
  .tag::before {
    background: ${({theme}) => theme.tagBG};
  }
  .table {
    background: ${({theme}) => theme.tableBody};
    color: ${({ theme }) => theme.text};
  }
  `
