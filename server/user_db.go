package cvv

import "time"

type User struct {
	Emails   []UserEmail    `datastore:,noindex`
	Avatar   string         `datastore:,noindex`
	Services []UserServices `datastore:,noindex`
	roles    []string       `datastore:,noindex`
}

type UserEmail struct {
	Address  string `datastore:,index`
	Verified bool   `datastore:,noindex`
	Active   bool   `datastore:,noindex`
}

type UserServices struct {
	Name    string    `datastore:,index`
	Token   string    `datastore:,index`
	Options string    `datastore:,noindex`
	Expires time.Time `datastore:,noindex`
}

type UserLoginDataWithPassword struct {
	Email        string
	PasswordHash string
}
