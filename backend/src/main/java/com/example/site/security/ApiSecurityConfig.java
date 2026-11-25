package com.example.site.security;

import java.util.List;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
public class ApiSecurityConfig {
    private static final org.slf4j.Logger log = org.slf4j.LoggerFactory.getLogger(ApiSecurityConfig.class);

    @Bean
    PasswordEncoder passwordEncoder() {
        return PasswordEncoderFactories.createDelegatingPasswordEncoder();
    }

    @Bean
    UserDetailsService adminUsers(
            @Value("${app.admin.email:}") String email,
            @Value("${app.admin.password:}") String password,
            PasswordEncoder passwordEncoder) {
        log.info("Admin user configured: email='{}', passwordLength={}", email, password.length());
        if (email.isBlank() || password.isBlank()) {
            return username -> { throw new UsernameNotFoundException("Administrator is not configured"); };
        }
        final String encodedPassword = passwordEncoder.encode(password);
        return username -> {
            if (!email.equalsIgnoreCase(username)) throw new UsernameNotFoundException("Administrator not found");
            return User.withUsername(email)
                    .password(encodedPassword)
                    .roles("ADMIN")
                    .build();
        };
    }

    @Bean
    DaoAuthenticationProvider authenticationProvider(UserDetailsService userDetailsService, PasswordEncoder passwordEncoder) {
        var provider = new DaoAuthenticationProvider(userDetailsService);
        provider.setPasswordEncoder(passwordEncoder);
        return provider;
    }

    @Bean
    AuthenticationManager authenticationManager(DaoAuthenticationProvider authenticationProvider) {
        var manager = new ProviderManager(authenticationProvider);
        manager.setEraseCredentialsAfterAuthentication(false);
        return manager;
    }

    @Bean
    SecurityFilterChain apiSecurity(HttpSecurity http, AuthenticationManager authenticationManager) throws Exception {
        return http
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authenticationManager(authenticationManager)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/health/**", "/api/v1/leads").permitAll()
                        .requestMatchers("/api/v1/admin/**").hasRole("ADMIN")
                        .anyRequest().permitAll())
                .httpBasic(Customizer.withDefaults())
                .build();
    }

    @Bean
    CorsConfigurationSource corsConfigurationSource(@Value("${app.cors.allowed-origins}") String origins) {
        var cors = new CorsConfiguration();
        cors.setAllowedOrigins(List.of(origins.split(",")));
        cors.setAllowedMethods(List.of("GET", "POST", "PATCH", "PUT", "DELETE", "OPTIONS"));
        cors.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        cors.setAllowCredentials(false);
        var source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", cors);
        return source;
    }
}
