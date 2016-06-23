package cvv

import (
	"time"
)

type User struct {
	Emails   []UserEmail   `datastore:,noindex`
	Avatar   string        `datastore:,noindex`
	Services []UserService `datastore:,noindex`
	roles    []string      `datastore:,noindex`
}

type LoginSession struct {
	Expires     time.Time `datastore:,noindex`
	UserId      string    `datastore:,noindex`
	SessionName string    `datastore:,noindex`
}

type UserEmail struct {
	Address  string `datastore:,index`
	Verified bool   `datastore:,noindex`
	Active   bool   `datastore:,noindex`
}

type UserService struct {
	Name    string `datastore:,index`
	Token   string `datastore:,index`
	Options string `datastore:,noindex`
}
