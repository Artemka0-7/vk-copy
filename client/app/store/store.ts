import { IUser } from "../models/IUser";
import {makeAutoObservable} from 'mobx'
import AuthService from "../service/AuthService";
import { AuthResponse } from "../models/response/AuthResponse";
import axios from "axios";
import { API_URL } from "@/constants/constants"; 

export default class Store {
  user = {} as IUser;
  isAuth = false;
  isLoading = false;

  constructor() {
    makeAutoObservable(this)
  }

  setAuth(bool: boolean){
    this.isAuth = bool;
  }

  setUser(user: IUser){
    this.user = user;
  }

  setLoading(bool: boolean){
    this.isLoading = bool
  }

  async login(email: string, password: string) {
    try{
      const response = await AuthService.login(email, password);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user)
    } catch(e){
      console.log(e)
    }
  }

  async registration(email: string, password: string, firstName: string, lastName: string) {
    try{
      const response = await AuthService.registration(email, password, firstName, lastName);
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user)
    } catch(e){
      console.log(e)
    }
  }

  async logout() {
    try{
      const response = await AuthService.logout();
      localStorage.removeItem('token');
      this.setAuth(false);
      this.setUser({} as IUser)
    } catch(e){
      console.log(e)
    }
  }

  async checkAuth () {
    this.setLoading(true)
    try{
      const response = await axios.get<AuthResponse>(`${API_URL}/refresh`, {withCredentials: true})
      localStorage.setItem('token', response.data.accessToken);
      this.setAuth(true);
      this.setUser(response.data.user)
    } catch(e){
      console.log(e)
    } finally {
      this.setLoading(false)
    }
  }
}