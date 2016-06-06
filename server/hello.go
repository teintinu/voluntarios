package cvv

import (
	"fmt"
	"net/http"
)

func handleHello(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, world!")
}
