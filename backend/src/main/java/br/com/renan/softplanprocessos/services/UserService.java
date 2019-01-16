package br.com.renan.softplanprocessos.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import br.com.renan.softplanprocessos.domain.User;
import br.com.renan.softplanprocessos.dto.UserDTO;
import br.com.renan.softplanprocessos.repository.UserRepository;
import br.com.renan.softplanprocessos.services.exceptions.ObjectNotFoundException;

@Service
public class UserService implements UserDetailsService{
	
	@Autowired
	private UserRepository repository;
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	public List<User> findAll(){
		return repository.findAll();
	}
	
	public User findById(String id) {
		Optional<User> obj = repository.findById(id);
		return obj.orElseThrow(() -> new ObjectNotFoundException("Object not found"));
	}
	
	public User findByUsername(String name) {
	    return repository.findByUsername(name);
	}
	
	public User insert(User obj) {
		obj.setPassword(bCryptPasswordEncoder.encode(obj.getPassword()));
		obj.setRole(obj.getRole());
		return repository.insert(obj);
	}
	
	public User update(User obj) {
		User newObj = findById(obj.getId());
		updateData(newObj, obj);
		return repository.save(newObj);
	}
	
	private void updateData(User newObj, User obj) {
		newObj.setUsername(obj.getUsername());	
	}
	
	public void delete(String id) {
		findById(id);
		repository.deleteById(id);
	}
	
	public User fromDTO(UserDTO objDto) {
		return new User(objDto.getId(), objDto.getUsername(), objDto.getRole(), objDto.getPassword());
	}

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
	    User user = repository.findByUsername(username);
	    if(user != null) {
	    	List<GrantedAuthority> roles = new ArrayList<>();
	    	roles.add(new SimpleGrantedAuthority(user.getRole()));
	    	
	        List<GrantedAuthority> authorities = roles;
	        return buildUserForAuthentication(user, authorities);
	    } else {
	        throw new UsernameNotFoundException("username not found");
	    }
	}

	private UserDetails buildUserForAuthentication(User user, List<GrantedAuthority> authority) {
	    return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), (Collection<? extends GrantedAuthority>) authority);
	}
	

}
