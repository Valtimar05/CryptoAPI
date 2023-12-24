$(document).ready(function()
{

    $("#btn-main").click(function()
    { 
        const options = {
            method: 'GET',
            headers: 
            {
              'X-API-KEY': 'Ag4AW+fm4YP86FKx+XQHanDlD3AUm9P5mE7YbUI+dm0='
            }
          };
        //Zadeklarowanie i zdefiniowanie zmiennej options typu stałego, który zawiera metodę GET i nagłówek z kluczem API. Inaczej by API nie zadziałało.
        let cryptocurrency = $.trim($("#input-main").val().toLowerCase());
        //Zmienna cryptocurrency pobiera tekst z inputa, który konwertuje na małe znaki i na końcu usuwa białe znaki.
        let parent = document.querySelector('.container')
        //Zmienna pobiera klasę container
        let child = document.querySelector('img');
        //Zmienna pobiera element img
        

        fetch("https://openapiv1.coinstats.app/coins/" + cryptocurrency + "?currency=PLN", options)
            .then(response => response.json())
            .then(response => 
                {
        //Połącznie z API strony metodą GET i przy pomocy klucza API, wyszukuje kryptowalutę podaną w zmiennej cryptocurrency oraz wyszukuje jej cenę w złotówkach polskich
                    if (response.statusCode === 400) 
                    {
                    //jeżeli użytkownik źle poda identyfikator, który jest nazwą kryptowaluty (wyrzucenie błędu o złej prośbie, tj. Bad Request)
                        document.querySelectorAll('p').forEach(e => e.remove());
                        //Usunięcie wszystkich paragrafów, jakie istnieją w dokumencie
                        parent.removeChild(child);
                        //Usunięcie elementu img z klasy .container
                        let divwarning = document.createElement('div');
                        let fontawesome = document.createElement('i');
                        let pwarningfirst = document.createElement('p');
                        let pwarningsecond = document.createElement('p');
                        //Różne tworzenie zmiennych ważnych dla dalszego ich definiowania
                        divwarning.setAttribute('id', 'warning');
                        fontawesome.classList.add('fa-solid', 'fa-circle-exclamation', 'fa-4x');
                        pwarningfirst.innerHTML = "Nie znaleziono kryptowaluty.";
                        pwarningsecond.innerHTML = "Odśwież ponownie, aby skorzystać z wyszukiwarki."
                        //Definiowanie struktury zmiennych (elementów)
                        
                        parent.appendChild(divwarning);
                        divwarning.appendChild(fontawesome);
                        divwarning.appendChild(pwarningfirst);
                        divwarning.appendChild(pwarningsecond);
                        //Dodanie pierwszego elementu do rodzica, który będzie rodzicem dla 3 kolejnych elementów
                        document.querySelector('.input-group').textContent = '';
                        //Usunięcie zawartości input-group, czyli nie będzie można wyszukać ponownie kryptowaluty
                    }
                    else
                    {
                        let img = document.createElement('img');
                        img.src = response.icon;
                        let priceOfCrypto = parseInt(response.price).toFixed(2)
                        //Tworzenie zmiennych i definiowanie źródła obrazu jako obraz kryptowaluty z API
                        
                        let p = document.createElement('p');

                        for(let i = 0; i < 5; i++)
                        {
                            parent.appendChild(p);
                        }
                        //Stworzenie zmiennej p i dodanie 5 paragrafów do klasy .container

                        $("p").eq(0).text("Nazwa: " + response.name);
                        $("p").eq(1).text("Symbol: " + response.symbol);
                        $("p").eq(2).text("Obecna cena: " + priceOfCrypto + " zł");
                        $("p").eq(3).text("Zmiana % w ciągu godziny: " + response.priceChange1h + "%");
                        $("p").eq(4).text("Zmiana % w ciągu dnia: " + response.priceChange1d + "%");
                        $("p").eq(5).text("Zmiana % w ciągu tygodnia: " + response.priceChange1w + "%");
                        $("img").eq(0).attr('src', response.icon);
                        //Uzupełnienie tekstu do paragrafów o poszczególnych informacjach z API o danej kryptowalucie oraz dodanie obrazu takiej kryptowaluty.
                        
                    }

                    console.log(response);
                    //Informacja w konsoli nt. API
                })
            .catch(err => console.error(err));
            //Łapie błąd i przerzuca do konsoli, jeżeli taki wystąpi.   
    });

})