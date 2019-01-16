package br.com.renan.softplanprocessos.dto;

import java.io.Serializable;

import br.com.renan.softplanprocessos.domain.Role;
import br.com.renan.softplanprocessos.domain.User;

public class UserDTO implements Serializable{
	
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String username;
	private Role role;
	private String password;
	
	public UserDTO() {}
	
	public UserDTO(User obj) {
		this.id = obj.getId();
		this.username = obj.getUsername();
		this.role = Role.valueOf(obj.getRole());
		this.password = obj.getPassword();
	}
	
	
	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getRole() {
		return role.name();
	}

	public void setRole(String role) {
		this.role = Role.valueOf(role);
	}
	
}
