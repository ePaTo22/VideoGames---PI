import React from "react";

export const Pagination = ({ gamesPerPage, totalGames, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalGames / gamesPerPage); i++) {
    pageNumbers.push(i); // nos da el numero correcto de paginas
  }

  return (
    <div>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <a onClick={() => paginate(number)} href="#">
              {number}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

// function changePage(page) {
//   // Validate page
//   console.log("Page:", page);

//   if (page < 1) SetPages(1);
//   if (page > numPages()) SetPages(numPages());

//   bringPageDogs((page - 1) * records_per_page, page * records_per_page);
//   SetPages(page);
// }

// const numPages = () => {
//   let calculo = Math.ceil(dogs.length / records_per_page); //Calculo cuantas paginas serian, con respecto al largo total del arreglo de perros
//   return calculo;
// };

// <ButtonContainer>
//   <Button onClick={prevPage}>Previus</Button>
//   <p>{pages}</p>
//   <Button onClick={nextPage}>Next</Button>
// </ButtonContainer>;
// const [dogsFromPage, setDogsFromPage] = useState([]);
// let dogs = useSelector((state) => state.dogs);
// let records_per_page = 8;

// const [current_page, setCurrentPage] = useState(1);
// const [pages, SetPages] = useState(1);

// useEffect(() => {
//   changePage(1);
// }, [dogs]);

// function bringPageDogs(inicio, fin) {
//   if (dogs.error) {
//     alert("Specify a race");
//     setDogsFromPage([
//       {
//         id: 1,
//         name: "Dog not Found",
//         life_span: "",
//         image: {
//           url: "https://st2.depositphotos.com/3477229/11722/v/600/depositphotos_117229862-stock-illustration-error-page-not-found-cartoon.jpg",
//         },
//       },
//     ]);
//   } else {
//     let newArr = dogs.slice(inicio, fin);
//   }
// }

// const prevPage = () => {
//   if (current_page > 1) {
//     setCurrentPage(current_page - 1);
//     changePage(current_page - 1);
//     console.log("Prev:", current_page - 1);
//   }
// };

// const nextPage = () => {
//   if (current_page < numPages()) {
//     setCurrentPage(current_page + 1);
//     changePage(current_page + 1);
//     console.log("Next:", current_page + 1);
//   }
// };
