package br.com.renan.softplanprocessos.config;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import br.com.renan.softplanprocessos.services.UserService;

@Configuration
@EnableWebSecurity
public class SecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
		
	@Autowired
	CustomizeAuthenticationSuccessHandler customizeAuthenticationSuccessHandler;
		
		@Override
		protected void configure(AuthenticationManagerBuilder auth) throws Exception {
		    UserDetailsService userDetailsService = mongoUserDetails();
		    auth
		        .userDetailsService(userDetailsService)
		    	.passwordEncoder(bCryptPasswordEncoder);
		}
		
		@Override
		protected void configure(HttpSecurity http) throws Exception {
		    http
		        .authorizeRequests()
		            .antMatchers("/").permitAll()
		            .antMatchers("/login").permitAll()
		            .antMatchers("/users/**").permitAll()
		            .antMatchers("/processos/**").permitAll()
		            .antMatchers("/dashboard/**")
		            .authenticated().and().csrf().disable().formLogin().successHandler(customizeAuthenticationSuccessHandler)
		            .loginPage("/login").failureUrl("/login?error=true")
		            .usernameParameter("username")
		            .passwordParameter("password")
		            .and().logout()
		            .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
		            .logoutSuccessUrl("/").and().exceptionHandling();
		    
		}
		
		@Override
		public void configure(WebSecurity web) throws Exception {
		    web
		        .ignoring()
		        .antMatchers("/resources/**", "/static/**", "/css/**", "/js/**", "/images/**");
		}
		
		
		@Bean
		public UserDetailsService mongoUserDetails() {
		    return new UserService();
		}
}
